import paramiko

def final_check(host, user, password):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(hostname=host, username=user, password=password, timeout=10)
        
        print("Checking docker containers...")
        stdin, stdout, stderr = client.exec_command('docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"')
        print(stdout.read().decode())
        
        print("Checking host nginx status...")
        stdin, stdout, stderr = client.exec_command('systemctl is-active nginx')
        print(f"Nginx active: {stdout.read().decode().strip()}")
        
        client.close()
    except Exception as e:
        print(f"Failure: {e}")

if __name__ == "__main__":
    final_check("46.28.44.37", "root", "XL-vPxdc'iP2I'#6")
