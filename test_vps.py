import paramiko

def run_commands(host, user, password):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(hostname=host, username=user, password=password, timeout=10)
        
        # Stop host-level nginx to free up port 80
        print("Stopping host-level nginx...")
        client.exec_command('systemctl stop nginx || true')
        client.exec_command('systemctl disable nginx || true')
        
        # Also, let's make sure 'docker-compose' is available as a command
        # if only 'docker compose' (v2) is not working but 'docker-compose' might be.
        # Actually my deploy script already handles that.
        
        # Trigger an initial clone/deploy manually to see output
        print("Setting up app directory and initial clone...")
        stdin, stdout, stderr = client.exec_command('mkdir -p /root/appnity && cd /root/appnity && git clone https://github.com/appnity-softwares/appnity.git . || git pull')
        print(stdout.read().decode())
        print(stderr.read().decode())
        
        client.close()
        print("Setup completed.")
    except Exception as e:
        print(f"Failure: {e}")

if __name__ == "__main__":
    run_commands("46.28.44.37", "root", "XL-vPxdc'iP2I'#6")
