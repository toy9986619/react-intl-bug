async function init() {
  const startApplication = await import('./client');
  startApplication.default();
}
init();
