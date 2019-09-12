sudo apt-get update;
sudo apt-get install -y nginx;
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -;
sudo apt-get install -y nodejs;
node -v;
npm -v;
cat setup_fox_server_default > /etc/nginx/sites-available/default 
cd /var/www/html/ && mkdir vue && cd vue
git clone https://github.com/mfekadu/FantasticFive.git
echo "pls do vim /var/www/html/vue/app/client/src/utils/api.utils.ts"
echo "  url: \"http://<YOUR_DROPLET_IP>:3000\","
