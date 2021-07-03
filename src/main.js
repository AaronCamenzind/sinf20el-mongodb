// a simple nodejs program to host current installed 
// node_modules on a docker cluster instead on a local machine 
// built for perfomance-reasons :D
// npm install node-docker-api
const Docker = require('node-docker-api');
const { exec } = require('child_process');

const fs = require('fs');
const ip = require("ip");

const argv = process.argv();
const host = ip.address();

/** fixme: simply do a file opening via port tunelling and target the package.json file */
function createNewHost(argv) {
  let docker = new Docker({ socketPath: '/var/run/docker.sock' });

  function runSSH() {
    /* do an ssh from the conatiner into the host */
    exec(`sudo ssh ${ip.address}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`Error: ${error.message}`);
        return;
      }
  
      if (stderr) {
        console.log(`Stderr: ${stderr}`);
        return;
      }
  
      console.log(`stdout: ${stdout}`);
    });
  }

  docker.container.create({
    Image: 'ubuntu',
    name: `${argv}`,
    Port: '80'
  })

  /* start the container */ 
  console.log(`Starting the docker vm ${argv}`)
  .then((container) => container.start())

  /* do ssh from vm into host */
  console.log(`SSH into ${ip.address}`)
  runSSH();

  /* install npm modules to vm dir */
  console.log(`Installing npm modules to ${argv} mem`)
  exec(`sudo npm --install --prefix /var/lib/docker/overlay2/${argv}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`Error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.log(`Stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  });
}
