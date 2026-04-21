import paramiko
import sys

def test_ssh(host, user, password):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        print(f"Attempting to connect to {host} as {user}...")
        client.connect(hostname=host, username=user, password=password, timeout=10)
        print("Success: SSH connection established.")
        
        stdin, stdout, stderr = client.exec_command('git --version && docker --version && docker compose version')
        print("Versions on server:")
        print(stdout.read().decode())
        print(stderr.read().decode())
        
        client.close()
    except Exception as e:
        print(f"Failure: {e}")

if __name__ == "__main__":
    test_ssh("46.28.44.37", "root", "XL-vPxdc'iP2I'#6")
