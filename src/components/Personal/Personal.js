function Personal() {
  return (
    <>
      <label htmlFor="firstName">
        First Name
        <input
          type="text"
          className="form__first-name"
          placeholder="First Name"
        />
      </label>
      <label htmlFor="last-name">
        Last Name
        <input
          type="text"
          name="last-name"
          className="form__last-name"
          placeholder="Last Name"
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          type="email"
          name="email"
          className="form__email"
          placeholder="Email"
        />
      </label>
      <label htmlFor="phone-number">
        Phone Number
        <input
          type="tel"
          name="phone-number"
          className="form__phone"
          placeholder="Phone Number"
        />
      </label>
    </>
  );
}

export default Personal;
