# How To Deploy [FoxCycle] with [DigitalOcean][DO]

Congratulations! Your team just finished CSC 307 with Professor Fox and you have a beautiful Vue + Express bike shop!

Now, maybe you're wondering, "how do I put my website on the internet so that I can show off at the next career fair / interviews?"

Or, maybe you are the client himself (the 'Fox' of FoxCycle) and you want to deploy the website so the world can access your bicycles. 

Well, this tutorial will help you do just that. 

## YOU WILL NEED
- [x] A Vue.js client and an express.js API (done by the end of CSC 307 with Professor Fox!)
- [ ] A DigitalOcean account
- [ ] ~~A bit of cash (DigitalOcean costs $5/mo for the smallest package)~~
   * Free with [GitHub Education Software Dev Pack.][cheaper] Just click "get your pack" and use the promo code under "DigitalOcean"
   * You could [try heroku] if you want... but I preferred how DigitalOcean provides access to a [real IP address]
   * Why not Amazon Web Services? Well, feel free to compare [with this][compare] **or** [that article][compare2] because the two cloud infrastructure platforms are both good.

## DEPLOYMENT

### Part 1: Deploy the client

#### Create a "Droplet" with Docker preinstalled.
* **Login** to your DigitalOcean account
* **Click** "Create"
* **Select** "Droplets"
* **Notice** The default options: `"Ubuntu" | "Standard" | "$0.007 /hour"` | "No backups"
* **Click** "Marketplace" then **Click** Docker
* **Select** "San Francisco" because it is the closest datacenter to the FoxCycle headquarters. 
* _Optionally_ [set up a "New SSH Key"][ssh-key] for easy access to your servers. 
* **Type** `fox-client` into the hostname field.
* **Click** "Create"

#### SSH into the `fox-client` server
* **Hover** over the IP Address for the droplet you created
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
vim /var/www/html/vue/app/client/src/utils/api.utils.ts
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
cd /var/www/html/vue/app/client && npm install && npm run build
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

#### Great Job! Now you can access `http://<YOUR_DROPLET_IP>` via your browser to view the client!
But the database and api are not available yet, so let's do `part 2`.

### Part 2: Deploy the backend with `docker` and `pm2`

#### First set up the mysql server
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
```
the following will launch the mysql server
```bash
cd /var/www/html/vue/app
```
```bash
docker-compose up -d
```
##### at this point you can try to connect to the API (via Sequel Pro / MySQL Workbench / etc) with the following connection details
   ```javascript
   host: <YOUR_DROPLET_IP>
   username: root
   password: password
   port: 3306
   ```
* do `create database dev`
* then do what you need to do to get your data on the server. 

##### back in the ssh terminal, now, launch the api
```bash
cd /var/www/html/vue/app/api
```
```bash
npm install
```
```bash
npm install pm2 -g
```
```bash
pm2 start npm -- start
```
* `pm2` will let the api program run forever.

### now try to go to `http://<YOUR_DROPLET_IP>` via the browser and notice the fully working web app!


## Useful commands for debugging...

```bash
docker ps
```

```bash
pm2 ls
pm2 show 0
pm2 logs npm [--lines 1000]
```

* also consider looking at the database in Sequel Pro or MySqlWorkbench or your preferered method of accessing the database to make sure the it is running and that the data / tables / databases exist. 

[DO]: https://www.digitalocean.com/
[cheaper]: https://education.github.com/pack
[try heroku]: https://www.youtube.com/watch?v=j55fHUJqtyw
[real IP address]: https://help.heroku.com/4WADH6LX/can-you-provide-me-with-the-ip-address-for-my-application
[compare]: https://hackernoon.com/aws-vs-digitalocean-which-cloud-server-is-better-1386499a6664
[compare2]: https://serverguy.com/comparison/digitalocean-vs-aws-ec2/
[ssh-key]: https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/to-existing-droplet/
[todo]: https://www.youtube.com/watch?v=rC43FiOA36A
[FoxCycle]: http://foxcycle.github.io

[//]: # (useful resources)

[ufw-rules]: https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands
[docker-remove]: https://stackoverflow.com/a/51189547
