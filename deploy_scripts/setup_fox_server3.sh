ufw allow 3000:3306/tcp
cd /var/www/html/vue/app
docker-compose up -d
echo "okay go to the instructions now https://github.com/mfekadu/FantasticFive/blob/master/DEPLOYMENT_INSTRUCTIONS.md#part-2-deploy-the-backend-with-docker-and-pm2"
