const createLoginTracker = (userInfo, maxAttempts = 3) => {
  let attemptCount = 0;
  let isLocked = false;

  return (passwordAttempt) => {
    if (isLocked) {
      return 'Account locked due to too many failed login attempts';
    }

    if (passwordAttempt === userInfo.password) {
      attemptCount = 0;
      isLocked = false;
      return 'Login successful';
    }

    attemptCount += 1;

    if (attemptCount > maxAttempts) {
      isLocked = true;
      return 'Account locked due to too many failed login attempts';
    }

    return `Attempt ${attemptCount}: Login failed`;
  };
};

module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};
