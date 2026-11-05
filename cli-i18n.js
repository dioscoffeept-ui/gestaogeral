// Idiomas das páginas do cliente (menu e pagamento): PT, EN, ES, FR
(function () {
  const D = {
    pt: {
      _nome: 'Português', loading: 'A carregar…', pay: 'Pagamento', test: 'TESTE', secure: '🔒 Pagamento seguro · Stripe',
      item: 'artigo', items: 'artigos', seeOrder: 'ver pedido ▾', order: 'Pedido', paid: 'Pago', paidX: 'Pago!',
      preparing: 'Já estamos a preparar. Chamamos pelo número quando estiver pronto.', showCounter: 'Obrigado. Pode mostrar este ecrã no balcão.',
      receiptSent: '✓ Comprovativo enviado para', wantReceipt: 'Quer o comprovativo por email?', sendReceipt: 'Enviar comprovativo', sending: 'A enviar…',
      badEmail: 'Escreva um email válido.', confirming: 'A confirmar o pagamento…', dontClose: 'não feche esta página.',
      notAccepted: 'O pagamento não foi aceite. Tente de novo ou escolha outro método.', inactive: 'Este pagamento já não está ativo.<br>Peça um novo no balcão.',
      cantLoad: 'Não foi possível carregar o pagamento. Atualize a página.', receiptOpt: '✉️ Receber comprovativo por email (opcional)',
      payX: 'Pagar', processing: 'A processar…', loadErr: 'Erro ao carregar os métodos de pagamento.', emailWrong: 'O email não parece correto (ou deixe em branco).',
      confirmMbw: 'Confirme o pagamento na app MB WAY', invalidLink: 'Link de pagamento inválido.', nfcBad: 'Este link NFC não está completo.',
      notYours: 'Não é o seu pedido?', seeMenu: 'Ver o menu e pedir', newOrder: 'Fazer outro pedido',
      declined: 'O cartão foi recusado.', funds: 'Saldo insuficiente.', expired: 'O cartão está expirado.', cvc: 'O código de segurança (CVC) está errado.', procErr: 'Erro ao processar. Tente de novo.', number: 'O número do cartão está errado.', notDone: 'O pagamento não foi concluído.',
      menu: 'Menu', tagline: 'Peça e pague pelo telemóvel', all: 'Tudo', options: 'opções', counterWaiting: 'Pagamento do balcão', payBtn: 'Pagar',
      menuLoading: 'A carregar o menu…', notAvail: 'Os pedidos pelo telemóvel ainda não estão disponíveis aqui.<br>Faça o seu pedido no balcão. 🙂', menuEmpty: 'O menu ainda está a ser preparado.',
      seeCart: 'Ver pedido', choose: 'Escolha uma opção', normal: 'Normal', add: 'Juntar', yourOrder: 'O seu pedido', total: 'Total',
      callName: 'Nome para chamar', optional: '(opcional)', exName: 'Ex.: Ana', wantInvoice: '🧾 Quero fatura com NIF / receber por email', nif: 'NIF', email: 'Email', digits: '9 dígitos',
      onlyFor: 'Opcional. Usamos só para a fatura e o comprovativo.', note: '✏️ Nota para o pedido', exNote: 'Ex.: sem açúcar, para levar',
      badNif: 'O NIF não parece válido. Confirme os números ou deixe em branco.', badEmail2: 'O email não parece correto.', preparingPay: 'A preparar o pagamento…', linkBad: 'Link incompleto. Peça ajuda no balcão.', others: 'Outros'
    },
    en: {
      _nome: 'English', loading: 'Loading…', pay: 'Payment', test: 'TEST', secure: '🔒 Secure payment · Stripe',
      item: 'item', items: 'items', seeOrder: 'see order ▾', order: 'Order', paid: 'Paid', paidX: 'Paid!',
      preparing: "We're preparing it now. We'll call your number when it's ready.", showCounter: 'Thank you. You can show this screen at the counter.',
      receiptSent: '✓ Receipt sent to', wantReceipt: 'Want the receipt by email?', sendReceipt: 'Send receipt', sending: 'Sending…',
      badEmail: 'Please enter a valid email.', confirming: 'Confirming payment…', dontClose: "don't close this page.",
      notAccepted: 'The payment was not accepted. Try again or choose another method.', inactive: 'This payment is no longer active.<br>Ask for a new one at the counter.',
      cantLoad: 'Could not load the payment. Please refresh the page.', receiptOpt: '✉️ Get the receipt by email (optional)',
      payX: 'Pay', processing: 'Processing…', loadErr: 'Error loading payment methods.', emailWrong: "The email doesn't look right (or leave it blank).",
      confirmMbw: 'Confirm the payment in the MB WAY app', invalidLink: 'Invalid payment link.', nfcBad: 'This NFC link is incomplete.',
      notYours: 'Not your order?', seeMenu: 'See the menu and order', newOrder: 'Place another order',
      declined: 'The card was declined.', funds: 'Insufficient funds.', expired: 'The card has expired.', cvc: 'The security code (CVC) is wrong.', procErr: 'Processing error. Please try again.', number: 'The card number is wrong.', notDone: 'The payment was not completed.',
      menu: 'Menu', tagline: 'Order and pay from your phone', all: 'All', options: 'options', counterWaiting: 'Counter payment', payBtn: 'Pay',
      menuLoading: 'Loading the menu…', notAvail: 'Phone ordering is not available here yet.<br>Please order at the counter. 🙂', menuEmpty: 'The menu is still being prepared.',
      seeCart: 'View order', choose: 'Choose an option', normal: 'Regular', add: 'Add', yourOrder: 'Your order', total: 'Total',
      callName: 'Name to call', optional: '(optional)', exName: 'e.g. Anna', wantInvoice: '🧾 I want an invoice with tax number / by email', nif: 'Tax no. (NIF)', email: 'Email', digits: '9 digits',
      onlyFor: 'Optional. Used only for the invoice and receipt.', note: '✏️ Note for the order', exNote: 'e.g. no sugar, to take away',
      badNif: "The tax number doesn't look valid. Check it or leave it blank.", badEmail2: "The email doesn't look right.", preparingPay: 'Preparing payment…', linkBad: 'Incomplete link. Please ask at the counter.', others: 'Other'
    },
    es: {
      _nome: 'Español', loading: 'Cargando…', pay: 'Pago', test: 'PRUEBA', secure: '🔒 Pago seguro · Stripe',
      item: 'artículo', items: 'artículos', seeOrder: 'ver pedido ▾', order: 'Pedido', paid: 'Pagado', paidX: '¡Pagado!',
      preparing: 'Ya lo estamos preparando. Llamaremos tu número cuando esté listo.', showCounter: 'Gracias. Puedes mostrar esta pantalla en el mostrador.',
      receiptSent: '✓ Recibo enviado a', wantReceipt: '¿Quieres el recibo por email?', sendReceipt: 'Enviar recibo', sending: 'Enviando…',
      badEmail: 'Escribe un email válido.', confirming: 'Confirmando el pago…', dontClose: 'no cierres esta página.',
      notAccepted: 'El pago no fue aceptado. Inténtalo de nuevo o elige otro método.', inactive: 'Este pago ya no está activo.<br>Pide uno nuevo en el mostrador.',
      cantLoad: 'No se pudo cargar el pago. Actualiza la página.', receiptOpt: '✉️ Recibir el recibo por email (opcional)',
      payX: 'Pagar', processing: 'Procesando…', loadErr: 'Error al cargar los métodos de pago.', emailWrong: 'El email no parece correcto (o déjalo en blanco).',
      confirmMbw: 'Confirma el pago en la app MB WAY', invalidLink: 'Enlace de pago no válido.', nfcBad: 'Este enlace NFC está incompleto.',
      notYours: '¿No es tu pedido?', seeMenu: 'Ver el menú y pedir', newOrder: 'Hacer otro pedido',
      declined: 'La tarjeta fue rechazada.', funds: 'Saldo insuficiente.', expired: 'La tarjeta está caducada.', cvc: 'El código de seguridad (CVC) es incorrecto.', procErr: 'Error al procesar. Inténtalo de nuevo.', number: 'El número de tarjeta es incorrecto.', notDone: 'El pago no se completó.',
      menu: 'Menú', tagline: 'Pide y paga desde el móvil', all: 'Todo', options: 'opciones', counterWaiting: 'Pago del mostrador', payBtn: 'Pagar',
      menuLoading: 'Cargando el menú…', notAvail: 'Los pedidos por móvil aún no están disponibles aquí.<br>Pide en el mostrador. 🙂', menuEmpty: 'El menú aún se está preparando.',
      seeCart: 'Ver pedido', choose: 'Elige una opción', normal: 'Normal', add: 'Añadir', yourOrder: 'Tu pedido', total: 'Total',
      callName: 'Nombre para llamarte', optional: '(opcional)', exName: 'Ej.: Ana', wantInvoice: '🧾 Quiero factura con NIF / por email', nif: 'NIF', email: 'Email', digits: '9 dígitos',
      onlyFor: 'Opcional. Solo para la factura y el recibo.', note: '✏️ Nota para el pedido', exNote: 'Ej.: sin azúcar, para llevar',
      badNif: 'El NIF no parece válido. Revísalo o déjalo en blanco.', badEmail2: 'El email no parece correcto.', preparingPay: 'Preparando el pago…', linkBad: 'Enlace incompleto. Pide ayuda en el mostrador.', others: 'Otros'
    },
    fr: {
      _nome: 'Français', loading: 'Chargement…', pay: 'Paiement', test: 'TEST', secure: '🔒 Paiement sécurisé · Stripe',
      item: 'article', items: 'articles', seeOrder: 'voir la commande ▾', order: 'Commande', paid: 'Payé', paidX: 'Payé !',
      preparing: 'Nous la préparons. Nous appellerons votre numéro quand elle sera prête.', showCounter: 'Merci. Vous pouvez montrer cet écran au comptoir.',
      receiptSent: '✓ Reçu envoyé à', wantReceipt: 'Vous voulez le reçu par email ?', sendReceipt: 'Envoyer le reçu', sending: 'Envoi…',
      badEmail: 'Saisissez un email valide.', confirming: 'Confirmation du paiement…', dontClose: 'ne fermez pas cette page.',
      notAccepted: "Le paiement n'a pas été accepté. Réessayez ou choisissez un autre moyen.", inactive: "Ce paiement n'est plus actif.<br>Demandez-en un nouveau au comptoir.",
      cantLoad: "Impossible de charger le paiement. Actualisez la page.", receiptOpt: '✉️ Recevoir le reçu par email (facultatif)',
      payX: 'Payer', processing: 'Traitement…', loadErr: 'Erreur de chargement des moyens de paiement.', emailWrong: "L'email ne semble pas correct (ou laissez vide).",
      confirmMbw: "Confirmez le paiement dans l'app MB WAY", invalidLink: 'Lien de paiement invalide.', nfcBad: 'Ce lien NFC est incomplet.',
      notYours: "Ce n'est pas votre commande ?", seeMenu: 'Voir le menu et commander', newOrder: 'Passer une autre commande',
      declined: 'La carte a été refusée.', funds: 'Solde insuffisant.', expired: 'La carte a expiré.', cvc: 'Le code de sécurité (CVC) est incorrect.', procErr: 'Erreur de traitement. Réessayez.', number: 'Le numéro de carte est incorrect.', notDone: "Le paiement n'a pas abouti.",
      menu: 'Menu', tagline: 'Commandez et payez depuis votre téléphone', all: 'Tout', options: 'options', counterWaiting: 'Paiement du comptoir', payBtn: 'Payer',
      menuLoading: 'Chargement du menu…', notAvail: "La commande par téléphone n'est pas encore disponible ici.<br>Commandez au comptoir. 🙂", menuEmpty: 'Le menu est en cours de préparation.',
      seeCart: 'Voir la commande', choose: 'Choisissez une option', normal: 'Normal', add: 'Ajouter', yourOrder: 'Votre commande', total: 'Total',
      callName: 'Prénom pour vous appeler', optional: '(facultatif)', exName: 'Ex. : Anne', wantInvoice: '🧾 Je veux une facture avec NIF / par email', nif: 'N° fiscal (NIF)', email: 'Email', digits: '9 chiffres',
      onlyFor: 'Facultatif. Utilisé uniquement pour la facture et le reçu.', note: '✏️ Note pour la commande', exNote: 'Ex. : sans sucre, à emporter',
      badNif: 'Le NIF ne semble pas valide. Vérifiez-le ou laissez vide.', badEmail2: "L'email ne semble pas correct.", preparingPay: 'Préparation du paiement…', linkBad: 'Lien incomplet. Demandez au comptoir.', others: 'Autres'
    }
  };
  const LOC = { pt: 'pt-PT', en: 'en-GB', es: 'es-ES', fr: 'fr-FR' };
  let L = '';
  try { L = localStorage.getItem('ds_lang_cli') || ''; } catch (_) {}
  if (!D[L]) { const nav = (navigator.languages || [navigator.language || 'pt']).map(x => String(x).slice(0, 2).toLowerCase()); L = nav.find(x => D[x]) || 'pt'; }
  window.LANG = L;
  window.LOCALE = LOC[L];
  window.T = k => (D[L] && D[L][k] != null ? D[L][k] : D.pt[k] != null ? D.pt[k] : k);
  document.documentElement.lang = L;
  // seletor (botões pequenos PT EN ES FR)
  window.langSeletor = function (el) {
    if (!el) return;
    el.innerHTML = Object.keys(D).map(k => `<button type="button" data-l="${k}" aria-label="${D[k]._nome}" style="font:inherit;font-size:11px;font-weight:900;padding:4px 7px;border-radius:8px;border:0;cursor:pointer;${k === L ? 'background:var(--brand);color:#fff' : 'background:rgba(15,23,42,.06);color:#475569'}">${k.toUpperCase()}</button>`).join('');
    el.querySelectorAll('button').forEach(b => b.onclick = () => { try { localStorage.setItem('ds_lang_cli', b.dataset.l); } catch (_) {} location.reload(); });
  };
})();
