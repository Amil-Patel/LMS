// Validation function
const validateField = (name, value, rules) => {
  let error = '';
  if (rules.required && !value) {
    error = `${name} is required.`;
  } else if (rules.pattern && !rules.pattern.test(value)) {
    error = `Invalid ${name}.`;
  } else if (rules.minLength && value.length < rules.minLength) {
    error = `${name} must be at least ${rules.minLength} characters long.`;
  } else if (rules.maxLength && value.length > rules.maxLength) {
    error = `${name} must be no more than ${rules.maxLength} characters long.`;
  }
  return error;
};

// Validation Component
const useValidation = (fields) => {
  const validate = (formValues) => {
    const errors = {};
    for (const field of Object.keys(fields)) {
      const error = validateField(field, formValues[field], fields[field].validation);
      if (error) errors[field] = error;
    }
    return errors;
  };

  return { validate };
};

export default useValidation;
