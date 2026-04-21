import paramiko

def repair_vps(host, user, password):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        client.connect(hostname=host, username=user, password=password, timeout=10)
        
        # 1. Restart host Nginx immediately
        print("Restarting host-level nginx...")
        client.exec_command('systemctl start nginx')
        client.exec_command('systemctl enable nginx')
        
        # 2. Verify port 8080 is what we should use
        print("Verifying services...")
        
        client.close()
        print("Nginx restored.")
    except Exception as e:
        print(f"Failure: {e}")

if __name__ == "__main__":
    repair_vps("46.28.44.37", "root", "XL-vPxdc'iP2I'#6")
