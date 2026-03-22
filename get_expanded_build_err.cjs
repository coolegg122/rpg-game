const { execSync } = require('child_process');

try {
  console.log("Running npm run build...");
  execSync('npm run build', { stdio: 'pipe' });
  console.log("Build Success!");
} catch (err) {
  console.error("\n❌ Build Failed with error:");
  if (err.errors) {
    console.log("Detailed Errors Array:");
    err.errors.forEach((e, i) => {
      console.log(`[Error ${i + 1}]`);
      console.log(e);
      if (e.message) console.log("Message:", e.message);
      if (e.location) console.log("Location:", JSON.stringify(e.location));
    });
  } else {
    console.log("No .errors array found. Printing full err details:");
    console.log(err);
  }
}
