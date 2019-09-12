cd /var/www/html/vue/app/client && npm install && npm run build
sudo nginx -t
sudo service nginx restart
sudo ufw allow http
echo "pls do vim /var/www/html/vue/app/api/config.json"
echo "    \"host\": \"<YOUR_DROPLET_IP>\","
