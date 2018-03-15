# Jobber
An application tracker for job seekers. Separates jobs into stages and allows users to check them at a glance by stage and filter by title and progress.

Originally made for HackTheBurgh 2018

## Development
This utility requires npm and bundler.
First, clone into the development directory.
Then install associated files.

```bundler install``` sets up rails for us.  
```npm install``` sets up all of the associated ReactJS development tools.  

Those tools of particular importance are the rails server and webpack.  

```npm run dev``` runs a configured script in package.json for running our webpack config in dev mode.  
```rails server``` sets up the rails server that serves our assets to 0.0.0.0:3000
