export function validateCPF(cpf) {
   // Se o CPF contém caracteres não numéricos, retorna falso imediatamente
   if (/[^\d]/.test(cpf)) {
      return false;
   }

   // Remove caracteres não numéricos (por precaução, mesmo após a verificação)
   cpf = cpf.replace(/\D/g, '');
 
   // Verifica se o CPF tem 11 dígitos ou se é uma sequência de dígitos repetidos
   if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
   }
 
   // Calcula o primeiro dígito verificador
   let sum = 0;
   for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
   }
   let remainder = (sum * 10) % 11;
   if (remainder === 10 || remainder === 11) remainder = 0;
   if (remainder !== parseInt(cpf.charAt(9))) {
      return false;
   }
 
   // Calcula o segundo dígito verificador
   sum = 0;
   for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
   }
   remainder = (sum * 10) % 11;
   if (remainder === 10 || remainder === 11) remainder = 0;
   if (remainder !== parseInt(cpf.charAt(10))) {
      return false;
   }
 
   return true;
}
