# How To Deploy FoxCycle with [DigitalOcean][DO]

Congratulations! Your team just finished CSC 307 with Professor Fox and you have a beautiful Vue + Express bike shop!

Now, maybe you're wondering, "how do I put my website on the internet so that I can show off at the next career fair / interviews?"

Or, maybe you are the client himself (the 'Fox' of FoxCycle) and you want to deploy the website so the world can access your bicycles. 

Well, this tutorial will help you do just that. 

## YOU WILL NEED
- [x] A Vue.js client and an express.js API (done by the end of CSC 307 with Professor Fox!)
- [ ] A DigitalOcean account
- [ ] ~~A bit of cash (DigitalOcean costs $5/mo for the smallest package)~~
   * Free with [GitHub Education Software Dev Pack.][cheaper] Simply click "get your pack" and use the promo code under "DigitalOcean"
   * you could [try heroku] if you want... but I preferred how DigitalOcean provides access to a [real IP address][heroku_no_ip]
   * Why not Amazon Web Services? Well, feel free to compare [with this][compare] **or** [that article][compare2] because the two cloud infrastructure platforms are both good.

## DEPLOYMENT

### First deploy the client

#### Part 1: Deploy the client on a "Droplet" with Docker preinstalled.
* **Click** "Create"
* **Select** "Droplets"
* **Notice** The default options: `"Ubuntu" | "Standard" | "$0.007 /hour"` | "No backups"
* **Click** "Marketplace" then **Click** Docker
* **Select** "San Francisco" because it is the closest datacenter to the FoxCycle headquarters. 
* _Optionally_ [set up a "New SSH Key"][ssh_key] to for easy access to your servers. 
* **Type** `fox-client` into the hostname field.
* **Click** "Create"

#### SSH into the `fox-client` server
* **Hover** over the IP Address for the droplet you createdf
* **Click** copy
* **Open** a terminal / command prompt window
* **Type** 

   ```bash
   ssh root@<YOUR_DROPLET_IP>
   ```

* **Check your email** for the new droplet's root password.
   * _Optionally_ just type `yes` if you had setup your SSH key

##### Now run these commands
```bash
sudo apt-get update
```
```bash
sudo apt-get install -y nginx
```
```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
```
```bash
sudo apt-get install -y nodejs
```
```bash
node -v
```
* expect `v8.15.1` or greater
```bash
npm -v
```
* expect: `6.5.1` or greater
```bash
vim /etc/nginx/sites-available/default 
```
* modify that file to look like this...
   ```bash
   server {
      listen 80 default_server;
      listen [::]:80 default_server;

      # this will be the location of the index.html of the single-page vue app after executing `npm run build`
      root /var/www/html/vue/app/client/dist;

      index index.html index.htm index.nginx-debian.html;

      server_name _;

      error_page 404 /; # makes the error 404 page go to the base url

      location / {
         try_files $uri $uri/ =404;
      }
   }
   ```
##### more commands
```bash
cd /var/www/html/ && mkdir vue && cd vue
```
```bash
git clone https://github.com/<YOUR_GITHUB_ORGANIZATION>/<YOUR_GITHUB_REPO>.git app
```
* the "app" part at the end is needed to name the folder for the sake of simplifying this tutorial

##### point to the future location of the api
```bash
vim app/client/src/utils/api.utils.ts
```
* modify that file to look like this (where `localhost` is replaced with `<YOUR_DROPLET_IP>`)...
   ```javascript
   export let APIConfig = {
     url: "http://<YOUR_DROPLET_IP>:3000",
     buildUrl(path: string): string {
       return `${this.url}${path}`;
     }
   };
   ```
##### more commands
```bash
cd app/client && npm install && npm run build
```
```bash
sudo nginx -t
```
```bash
sudo service nginx restart
```
```bash
sudo ufw allow http
```

#### Great Job! Now you can access the `<YOUR_DROPLET_IP>` via your browser to view the client!
But the database and api are not available yet, so let's do `part 2`.

#### Part 2: Deploy the backend with Docker.
```bash
vim /var/www/html/vue/app/api/config.json
```
* modify that file to look like this...
   ```javascript
   {
     "dev": {
       "host": "<YOUR_DROPLET_IP>",
       "port": 3306,
       "username": "root",
       "password": "password",
       "database": "dev"
     },
     "test": {
       "host": "localhost",
       "port": 3306,
       "username": "root",
       "password": "password",
       "database": "test"
     }
   }
   ```
```
ufw allow 3000:3306/tcp
# ufw allow mysql
```
```bash
docker pull mysql/mysql-server
docker run --name=mysql1 -d mysql/mysql-server
cd /var/www/html/vue/app
docker-compose up -d
```
```
cd /var/www/html/vue/app/api
```
```
npm install && npm run dev
```
[.... To be continued ....][todo]

##### Keep it running forever
```bash
npm install pm2 -g
```

```bash
pm2 start npm -- start
```

```
pm2 install ts-node
pm2 install typescript
```



[DO]: https://www.digitalocean.com/
[cheaper]: https://education.github.com/pack
[try heroku]: https://www.youtube.com/watch?v=j55fHUJqtyw
[heroku_no_ip]: https://help.heroku.com/4WADH6LX/can-you-provide-me-with-the-ip-address-for-my-application
[compare]: https://hackernoon.com/aws-vs-digitalocean-which-cloud-server-is-better-1386499a6664
[compare2]: https://serverguy.com/comparison/digitalocean-vs-aws-ec2/
[ssh_key]: https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/to-existing-droplet/
[todo]: https://www.youtube.com/watch?v=rC43FiOA36A
