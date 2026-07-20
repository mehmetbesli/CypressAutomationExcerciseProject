const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "reports/html",
    reportFilename: "[datetime]",
    timestamp: "yyyy-mm-dd_HH-MM-ss",
    overwrite: false,
    html: true,
    json: false,
    charts: true,
    inlineAssets: true,
    embeddedScreenshots: true
  },
  retries: {
    runMode: 2,
    openMode: 0
  },
  e2e: {
    // Default baseUrl is set, but will be dynamically overwritten by our environment switcher
    baseUrl: "https://automationexercise.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    video: false, //Will record if enabled
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: false,
    screenshotsFolder: "reports/screenshotOrVideo",
    videosFolder: "reports/screenshotOrVideo",
    setupNodeEvents(on, config) {
      // Store event listeners registered by plugins
      const pluginEvents = {};

      // Create a wrapper for 'on' to intercept registration of events we want to extend
      const customOn = (event, callback) => {
        if (event === "after:run") {
          pluginEvents["after:run"] = callback;
        } else {
          on(event, callback);
        }
      };

      // Initialize the Mochawesome reporter plugin with our wrapper
      require("cypress-mochawesome-reporter/plugin")(customOn);

      // --- MULTI-ENVIRONMENT CONFIGURATION SWAPPER ---
      // Get the environment name from the CLI argument (defaults to 'qa')
      const environmentName = config.env.envName || "qa";

      // Resolve the path to the environment config file
      const pathToConfigFile = path.resolve("cypress", "config", `${environmentName}.json`);

      // Read and merge the configuration parameters if file exists
      if (fs.existsSync(pathToConfigFile)) {
        const rawData = fs.readFileSync(pathToConfigFile);
        const envConfig = JSON.parse(rawData);

        if (envConfig.baseUrl) {
          config.baseUrl = envConfig.baseUrl;
        }
        if (envConfig.env) {
          config.env = { ...config.env, ...envConfig.env };
        }
      } else {
        throw new Error(`Configuration file not found: ${pathToConfigFile}`);
      }
      // ------------------------------------------------

      // Listen to the after:screenshot event to rename the screenshot files
      on("after:screenshot", (details) => {
        const date = new Date();
        const timestamp = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}_${String(date.getHours()).padStart(2, "0")}-${String(date.getMinutes()).padStart(2, "0")}-${String(date.getSeconds()).padStart(2, "0")}`;
        
        // Save directly inside reports/screenshotOrVideo (config.screenshotsFolder)
        const screenshotsFolder = config.screenshotsFolder || "reports/screenshotOrVideo";
        const newPath = path.join(screenshotsFolder, `${timestamp}.png`);
        const specFolder = path.dirname(details.path);

        return new Promise((resolve, reject) => {
          // Rename and move the file up to the parent directory
          fs.rename(details.path, newPath, (err) => {
            if (err) {
              return reject(err);
            }
            
            // Delete the empty spec subdirectory left behind
            try {
              if (fs.existsSync(specFolder) && fs.readdirSync(specFolder).length === 0) {
                fs.rmdirSync(specFolder);
              }
            } catch (e) {
              // Ignore cleanup errors to prevent breaking the test run
            }

            resolve({ path: newPath });
          });
        });
      });

      // Listen to the after:spec event to process spec video
      on("after:spec", (spec, results) => {
        if (results && results.video) {
          // Check if there are any ultimate failures in the spec run
          const hasFailures = results.stats && results.stats.failures > 0;

          if (!hasFailures) {
            // Delete the video if there were no failures to save disk space
            if (fs.existsSync(results.video)) {
              fs.unlinkSync(results.video);
            }
          } else {
            // Rename and move the video to reports/screenshotOrVideo/YYYY-MM-DD_HH-mm-ss.mp4
            const date = new Date();
            const timestamp = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}_${String(date.getHours()).padStart(2, "0")}-${String(date.getMinutes()).padStart(2, "0")}-${String(date.getSeconds()).padStart(2, "0")}`;
            
            const videosFolder = config.videosFolder || "reports/screenshotOrVideo";
            const newPath = path.join(videosFolder, `${timestamp}.mp4`);
            
            if (fs.existsSync(results.video)) {
              fs.renameSync(results.video, newPath);
              
              // Clean up the empty spec directory under videosFolder if Cypress created one
              const specFolder = path.dirname(results.video);
              try {
                if (fs.existsSync(specFolder) && fs.readdirSync(specFolder).length === 0) {
                  fs.rmdirSync(specFolder);
                }
              } catch (e) {
                // Ignore cleanup errors
              }
            }
          }
        }
      });

      // Register the combined after:run event
      on("after:run", async (results) => {
        // 1. Run the Mochawesome plugin's after:run hook first to generate the HTML report
        if (pluginEvents["after:run"]) {
          await pluginEvents["after:run"](results);
        }

        // 2. Perform cleanup under reports/html to delete copied assets, screenshots, and videos folders
        const htmlDir = path.join(__dirname, "reports", "html");
        const foldersToClean = ["screenshots", "videos", "assets", ".jsons"];
        
        foldersToClean.forEach((folder) => {
          const folderPath = path.join(htmlDir, folder);
          if (fs.existsSync(folderPath)) {
            fs.rmSync(folderPath, { recursive: true, force: true });
          }
        });
      });

      // Return the updated config object to Cypress
      return config;
    },
  },
});
