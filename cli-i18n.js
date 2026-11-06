// Idiomas das páginas do cliente (menu e pagamento): PT, EN, ES, FR
(function () {
  const D = {
    pt: {
      invName: 'Nome e apelido / empresa (para a fatura)', exInv: 'Ex.: Ana Silva ou Café Lda', tip: 'Gorjeta', noTip: 'Sem gorjeta', otherTip: 'Outro', tipAsk: 'Valor da gorjeta (€)', payNow: 'Pagar agora', payCounter: 'Pagar no balcão', sendCounter: 'Enviar pedido · pago no balcão', needName: 'Escreva o nome para chamarmos.', needInvName: 'Para a fatura com NIF escreva o nome e apelido (ou o nome da empresa).', sentTitle: 'Pedido enviado!', payAt: 'Pague no balcão:', weCall: 'Chamamos pelo nome quando estiver pronto.', orderNo: 'Pedido', thanksTip: 'Obrigado pela gorjeta! 💛', back: 'Voltar ao menu', withTip: 'com gorjeta',
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
      invName: 'Full name / company (for the invoice)', exInv: 'e.g. Anna Smith or Café Ltd', tip: 'Tip', noTip: 'No tip', otherTip: 'Other', tipAsk: 'Tip amount (€)', payNow: 'Pay now', payCounter: 'Pay at the counter', sendCounter: 'Send order · pay at the counter', needName: 'Please enter a name so we can call you.', needInvName: 'For an invoice with tax number, enter your full name (or company name).', sentTitle: 'Order sent!', payAt: 'Pay at the counter:', weCall: "We'll call your name when it's ready.", orderNo: 'Order', thanksTip: 'Thank you for the tip! 💛', back: 'Back to menu', withTip: 'incl. tip',
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
      invName: 'Nombre y apellido / empresa (para la factura)', exInv: 'Ej.: Ana García o Café SL', tip: 'Propina', noTip: 'Sin propina', otherTip: 'Otra', tipAsk: 'Importe de la propina (€)', payNow: 'Pagar ahora', payCounter: 'Pagar en el mostrador', sendCounter: 'Enviar pedido · pago en el mostrador', needName: 'Escribe un nombre para llamarte.', needInvName: 'Para la factura con NIF escribe nombre y apellido (o el nombre de la empresa).', sentTitle: '¡Pedido enviado!', payAt: 'Paga en el mostrador:', weCall: 'Te llamaremos por tu nombre cuando esté listo.', orderNo: 'Pedido', thanksTip: '¡Gracias por la propina! 💛', back: 'Volver al menú', withTip: 'con propina',
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
      invName: 'Nom et prénom / société (pour la facture)', exInv: 'Ex. : Anne Martin ou Café SARL', tip: 'Pourboire', noTip: 'Sans pourboire', otherTip: 'Autre', tipAsk: 'Montant du pourboire (€)', payNow: 'Payer maintenant', payCounter: 'Payer au comptoir', sendCounter: 'Envoyer · payer au comptoir', needName: 'Indiquez un prénom pour vous appeler.', needInvName: 'Pour une facture avec NIF, indiquez nom et prénom (ou le nom de la société).', sentTitle: 'Commande envoyée !', payAt: 'Payez au comptoir :', weCall: 'Nous vous appellerons quand ce sera prêt.', orderNo: 'Commande', thanksTip: 'Merci pour le pourboire ! 💛', back: 'Retour au menu', withTip: 'pourboire inclus',
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
    },
    de: {
      invName: 'Vor- und Nachname / Firma (für die Rechnung)', exInv: 'z. B. Anna Müller oder Café GmbH', tip: 'Trinkgeld', noTip: 'Kein Trinkgeld', otherTip: 'Anderes', tipAsk: 'Trinkgeld (€)', payNow: 'Jetzt bezahlen', payCounter: 'An der Theke zahlen', sendCounter: 'Bestellen · an der Theke zahlen', needName: 'Bitte gib einen Namen an, damit wir dich aufrufen können.', needInvName: 'Für eine Rechnung mit Steuernummer bitte Vor- und Nachnamen (oder Firmennamen) angeben.', sentTitle: 'Bestellung gesendet!', payAt: 'Zahle an der Theke:', weCall: 'Wir rufen deinen Namen auf, wenn es fertig ist.', orderNo: 'Bestellung', thanksTip: 'Danke für das Trinkgeld! 💛', back: 'Zurück zum Menü', withTip: 'inkl. Trinkgeld',
      _nome: 'Deutsch', loading: 'Wird geladen…', pay: 'Zahlung', test: 'TEST', secure: '🔒 Sichere Zahlung · Stripe',
      item: 'Artikel', items: 'Artikel', seeOrder: 'Bestellung ansehen ▾', order: 'Bestellung', paid: 'Bezahlt', paidX: 'Bezahlt!',
      preparing: 'Wir bereiten es gerade zu. Wir rufen deine Nummer auf, wenn es fertig ist.', showCounter: 'Danke. Du kannst diesen Bildschirm an der Theke zeigen.',
      receiptSent: '✓ Beleg gesendet an', wantReceipt: 'Beleg per E-Mail?', sendReceipt: 'Beleg senden', sending: 'Wird gesendet…',
      badEmail: 'Bitte eine gültige E-Mail eingeben.', confirming: 'Zahlung wird bestätigt…', dontClose: 'Seite nicht schließen.',
      notAccepted: 'Die Zahlung wurde nicht akzeptiert. Versuche es erneut oder wähle eine andere Methode.', inactive: 'Diese Zahlung ist nicht mehr aktiv.<br>Bitte an der Theke eine neue anfordern.',
      cantLoad: 'Zahlung konnte nicht geladen werden. Bitte Seite neu laden.', receiptOpt: '✉️ Beleg per E-Mail erhalten (optional)',
      payX: 'Bezahlen', processing: 'Wird verarbeitet…', loadErr: 'Fehler beim Laden der Zahlungsmethoden.', emailWrong: 'Die E-Mail scheint nicht korrekt (oder leer lassen).',
      confirmMbw: 'Bestätige die Zahlung in der MB WAY App', invalidLink: 'Ungültiger Zahlungslink.', nfcBad: 'Dieser NFC-Link ist unvollständig.',
      notYours: 'Nicht deine Bestellung?', seeMenu: 'Menü ansehen und bestellen', newOrder: 'Neue Bestellung',
      declined: 'Die Karte wurde abgelehnt.', funds: 'Nicht genügend Guthaben.', expired: 'Die Karte ist abgelaufen.', cvc: 'Der Sicherheitscode (CVC) ist falsch.', procErr: 'Verarbeitungsfehler. Bitte erneut versuchen.', number: 'Die Kartennummer ist falsch.', notDone: 'Die Zahlung wurde nicht abgeschlossen.',
      menu: 'Menü', tagline: 'Mit dem Handy bestellen und bezahlen', all: 'Alles', options: 'Optionen', counterWaiting: 'Zahlung an der Theke', payBtn: 'Bezahlen',
      menuLoading: 'Menü wird geladen…', notAvail: 'Bestellen per Handy ist hier noch nicht verfügbar.<br>Bitte an der Theke bestellen. 🙂', menuEmpty: 'Das Menü wird noch vorbereitet.',
      seeCart: 'Bestellung ansehen', choose: 'Wähle eine Option', normal: 'Normal', add: 'Hinzufügen', yourOrder: 'Deine Bestellung', total: 'Gesamt',
      callName: 'Name zum Aufrufen', optional: '(optional)', exName: 'z. B. Anna', wantInvoice: '🧾 Rechnung mit Steuernummer / per E-Mail', nif: 'Steuernr. (NIF)', email: 'E-Mail', digits: '9 Ziffern',
      onlyFor: 'Optional. Nur für Rechnung und Beleg.', note: '✏️ Notiz zur Bestellung', exNote: 'z. B. ohne Zucker, zum Mitnehmen',
      badNif: 'Die Steuernummer scheint ungültig. Prüfen oder leer lassen.', badEmail2: 'Die E-Mail scheint nicht korrekt.', preparingPay: 'Zahlung wird vorbereitet…', linkBad: 'Unvollständiger Link. Bitte an der Theke fragen.', others: 'Sonstiges'
    },
    it: {
      invName: 'Nome e cognome / azienda (per la fattura)', exInv: 'Es.: Anna Rossi o Café Srl', tip: 'Mancia', noTip: 'Senza mancia', otherTip: 'Altro', tipAsk: 'Importo della mancia (€)', payNow: 'Paga ora', payCounter: 'Paga al banco', sendCounter: 'Invia ordine · paga al banco', needName: 'Scrivi un nome per chiamarti.', needInvName: 'Per la fattura con codice fiscale scrivi nome e cognome (o il nome dell\'azienda).', sentTitle: 'Ordine inviato!', payAt: 'Paga al banco:', weCall: 'Ti chiameremo per nome quando è pronto.', orderNo: 'Ordine', thanksTip: 'Grazie per la mancia! 💛', back: 'Torna al menù', withTip: 'mancia inclusa',
      _nome: 'Italiano', loading: 'Caricamento…', pay: 'Pagamento', test: 'TEST', secure: '🔒 Pagamento sicuro · Stripe',
      item: 'articolo', items: 'articoli', seeOrder: 'vedi ordine ▾', order: 'Ordine', paid: 'Pagato', paidX: 'Pagato!',
      preparing: 'Lo stiamo preparando. Chiameremo il tuo numero quando è pronto.', showCounter: 'Grazie. Puoi mostrare questa schermata al banco.',
      receiptSent: '✓ Ricevuta inviata a', wantReceipt: 'Vuoi la ricevuta via email?', sendReceipt: 'Invia ricevuta', sending: 'Invio…',
      badEmail: 'Inserisci un\'email valida.', confirming: 'Conferma del pagamento…', dontClose: 'non chiudere questa pagina.',
      notAccepted: 'Il pagamento non è stato accettato. Riprova o scegli un altro metodo.', inactive: 'Questo pagamento non è più attivo.<br>Chiedine uno nuovo al banco.',
      cantLoad: 'Impossibile caricare il pagamento. Aggiorna la pagina.', receiptOpt: '✉️ Ricevi la ricevuta via email (facoltativo)',
      payX: 'Paga', processing: 'Elaborazione…', loadErr: 'Errore nel caricamento dei metodi di pagamento.', emailWrong: 'L\'email non sembra corretta (o lascia vuoto).',
      confirmMbw: 'Conferma il pagamento nell\'app MB WAY', invalidLink: 'Link di pagamento non valido.', nfcBad: 'Questo link NFC è incompleto.',
      notYours: 'Non è il tuo ordine?', seeMenu: 'Vedi il menù e ordina', newOrder: 'Fai un altro ordine',
      declined: 'La carta è stata rifiutata.', funds: 'Fondi insufficienti.', expired: 'La carta è scaduta.', cvc: 'Il codice di sicurezza (CVC) è errato.', procErr: 'Errore di elaborazione. Riprova.', number: 'Il numero della carta è errato.', notDone: 'Il pagamento non è stato completato.',
      menu: 'Menù', tagline: 'Ordina e paga dal telefono', all: 'Tutto', options: 'opzioni', counterWaiting: 'Pagamento al banco', payBtn: 'Paga',
      menuLoading: 'Caricamento del menù…', notAvail: 'Gli ordini dal telefono non sono ancora disponibili qui.<br>Ordina al banco. 🙂', menuEmpty: 'Il menù è ancora in preparazione.',
      seeCart: 'Vedi ordine', choose: 'Scegli un\'opzione', normal: 'Normale', add: 'Aggiungi', yourOrder: 'Il tuo ordine', total: 'Totale',
      callName: 'Nome per chiamarti', optional: '(facoltativo)', exName: 'Es.: Anna', wantInvoice: '🧾 Voglio la fattura con codice fiscale / via email', nif: 'Cod. fiscale (NIF)', email: 'Email', digits: '9 cifre',
      onlyFor: 'Facoltativo. Solo per la fattura e la ricevuta.', note: '✏️ Nota per l\'ordine', exNote: 'Es.: senza zucchero, da asporto',
      badNif: 'Il codice fiscale non sembra valido. Controllalo o lascia vuoto.', badEmail2: 'L\'email non sembra corretta.', preparingPay: 'Preparazione del pagamento…', linkBad: 'Link incompleto. Chiedi al banco.', others: 'Altro'
    }
  };
  const LOC = { pt: 'pt-PT', en: 'en-GB', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', it: 'it-IT' };
  let L = '';
  try { L = sessionStorage.getItem('ds_lang_cli') || ''; } catch (_) {}
  if (!D[L]) { const nav = (navigator.languages || [navigator.language || 'pt']).map(x => String(x).slice(0, 2).toLowerCase()); L = nav.find(x => D[x]) || 'pt'; }
  window.LANG = L;
  window.LOCALE = LOC[L];
  window.T = k => (D[L] && D[L][k] != null ? D[L][k] : D.pt[k] != null ? D.pt[k] : k);
  document.documentElement.lang = L;
  // seletor (botões pequenos PT EN ES FR)
  window.langSeletor = function (el) {
    if (!el) return;
    const fl = { pt: '🇵🇹', en: '🇬🇧', es: '🇪🇸', fr: '🇫🇷', de: '🇩🇪', it: '🇮🇹' };
    el.innerHTML = `<select aria-label="Language" style="font:inherit;font-size:12px;font-weight:800;padding:5px 6px;border-radius:10px;border:1px solid rgba(15,23,42,.12);background:#fff;color:#334155;cursor:pointer">${Object.keys(D).map(k => `<option value="${k}" ${k === L ? 'selected' : ''}>${fl[k] || ''} ${k.toUpperCase()}</option>`).join('')}</select>`;
    el.querySelector('select').onchange = e => { try { sessionStorage.setItem('ds_lang_cli', e.target.value); } catch (_) {} location.reload(); };
  };

})();
