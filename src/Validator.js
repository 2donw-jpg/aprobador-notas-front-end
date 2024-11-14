import { defineRule } from 'vee-validate';

defineRule('required', value => {
  if (!value || !value.trim().length) return 'Este campo es requerido';
  return true;
});

defineRule('name', value => {
  if (!value || !value.trim().length) return true;
  if (!/^[a-zA-ZñÑ\s]+$/.test(value)) return 'Este campo solo debe de contener letras';
  return true;
});

defineRule('minLength', (value, [limit]) => {
  if (!value || !value.trim().length) return true;
  if (value.length < limit) return `El campo debe de contener por lo menos ${limit} carácteres`;
  return true;
});

defineRule('email', value => {
  if (!value || !value.trim().length) return true;
  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) return 'Este campo debe de ser un correo electrónico';
  return true;
});

