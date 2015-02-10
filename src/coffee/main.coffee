$ ->
  n = 1;
  $('#button').on 'click', (event)->
    event.preventDefault()
    $button = $(event.currentTarget)
    $button.text(n++ + '!!')
