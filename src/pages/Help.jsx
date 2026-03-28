
function Help() {
  return (
    <section className="page-container">
      <div className="help-card">
        <h2>Help</h2>

        <h3>How to use the app</h3>
        <p>
          Use the navigation menu at the top of the page to move between the
          Dashboard, Add Event, and Help sections.
        </p>

        <h3>How to register</h3>
        <p>
          Go to the Register page and enter your name, email, username, and
          password. All fields must be completed, and the email must be in a
          valid format.
        </p>

        <h3>How to log in</h3>
        <p>
          After registering, go to the Login page and enter your username and
          password to access your dashboard.
        </p>

        <h3>How to create an event</h3>
        <p>
          Open the Add Event page, complete the event form, and click Save
          Event. Your new event will appear on the dashboard.
        </p>

        <h3>How to edit an event</h3>
        <p>
          On the dashboard, click the Edit button on an event card. Update the
          details and save your changes.
        </p>

        <h3>How to delete an event</h3>
        <p>
          On the dashboard, click the Delete button on the event you want to
          remove. The event will be removed immediately.
        </p>

        <h3>Tips for organising events</h3>
        <ul>
          <li>Add clear event names so they are easy to identify.</li>
          <li>Include the correct date, time, and location.</li>
          <li>Write short descriptions to remember important details.</li>
          <li>Check your dashboard regularly for upcoming events.</li>
        </ul>
      </div>
    </section>
  );
}

export default Help;