package websocket

import (
	"bufio"
	"encoding/json"
	"sync"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/valyala/fasthttp"
)

type Client struct {
	hub  *Hub
	send chan []byte
	id   string
}

type Hub struct {
	clients    map[*Client]bool
	broadcast  chan []byte
	register   chan *Client
	unregister chan *Client
	mu         sync.RWMutex
}

type Message struct {
	Type    string      `json:"type"`
	Payload interface{} `json:"payload"`
}

func NewHub() *Hub {
	return &Hub{
		clients:    make(map[*Client]bool),
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.mu.Lock()
			h.clients[client] = true
			h.mu.Unlock()
			client.send <- []byte(`{"type":"connected","payload":{"status":"ok"}}`)

		case client := <-h.unregister:
			h.mu.Lock()
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
			}
			h.mu.Unlock()

		case message := <-h.broadcast:
			h.mu.RLock()
			for client := range h.clients {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(h.clients, client)
				}
			}
			h.mu.RUnlock()
		}
	}
}

func (h *Hub) BroadcastEvent(eventType string, payload interface{}) {
	msg := Message{Type: eventType, Payload: payload}
	data, _ := json.Marshal(msg)
	h.broadcast <- data
}

func (h *Hub) HandleSSE(c *fiber.Ctx) error {
	c.Set("Content-Type", "text/event-stream")
	c.Set("Cache-Control", "no-cache")
	c.Set("Connection", "keep-alive")
	c.Set("Transfer-Encoding", "chunked")

	c.Context().SetBodyStreamWriter(fasthttp.StreamWriter(func(w *bufio.Writer) {
		client := &Client{
			hub:  h,
			send: make(chan []byte, 256),
			id:   c.Query("id", "anonymous"),
		}

		h.register <- client

		for {
			select {
			case msg, ok := <-client.send:
				if !ok {
					return
				}
				w.WriteString("data: ")
				w.Write(msg)
				w.WriteString("\n\n")
				w.Flush()
			case <-time.After(30 * time.Second):
				h.unregister <- client
				return
			}
		}
	}))

	return nil
}
