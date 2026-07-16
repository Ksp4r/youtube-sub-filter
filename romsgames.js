async function Hunt(){
    let button;
    while(!button){
        await new Promise(resolve => setTimeout(resolve, 1000));
        button = Array.from(document.querySelectorAll('button')).filter(b => b.getAttribute('data-media-id'));
    }
  // get the real details for the download form
  let token;
  const downloadIcon = $('#download-icon')
  const downloadHint = $('#download-hint')
  const downloadText = $('#download-text')
  const mediaAttachInput = $('#media-attach')
  const mediaIdInput = $('#media-id')
  const mediaId = mediaIdInput.val()
  const captcha = $('#recaptcha')
  const form = $('#download-form')
  const formAction = form.attr('action')
  $.ajax({
    method: 'POST',
    url: formAction + '?download',
    headers: { accept: 'application/json' },
    data: {
      mediaId: mediaId,
      'g-recaptcha-response': token
    }
  }).done(function (response) {
    if (!response || !response.downloadUrl) {
      alert('Download not found, contact support')
    } else {
      // the response will need to be set to the form and then submitted
      form.attr('method', 'get')
      form.attr('action', response.downloadUrl)
      mediaAttachInput.val(response.downloadName || 'file.bin')
      captcha.remove()
      let downloadCount = 5
      const countdownInterval = setInterval(function () {
        const count = --downloadCount
        downloadText.text('Your download is starting in ' + count + '...')
      }, 1000)
      setTimeout(function () {
        // submit the form
        form.submit()
        clearInterval(countdownInterval)
        downloadIcon.removeClass('fa-spinner')
        downloadIcon.removeClass('fa-pulse')
        downloadIcon.addClass('fa-check')
        downloadText.text(downloadText.attr('data-success-text'))
        downloadHint.text(downloadHint.attr('data-success-text'))
      }, 100)
    }
  })
}
Hunt();
