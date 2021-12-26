$(function () {

  let $addItem = $('.add-item')
  let $recovery = $('.recovery')
  let $inputText = $('input:text')
  let $inputSubmit = $('input:submit')
  let $form = $('form')
  let $ul = $('ul')
  let $li = $('li')

  // 預設項目以動畫顯示
  $li.hide().each(function (index) {
    $(this).delay(700 * index).fadeIn(900)
  })
  // 隱藏表單輸入、按鈕
  $recovery.hide()
  $inputText.hide()
  $inputSubmit.hide()
  // 顯示表單輸入、按鈕
  $addItem.on('click', function () {
    $(this).hide()
    $recovery.show()
    $inputText.show()
    $inputSubmit.show()
  })

  // 更新項目計數器
  function updateCount() {
    let count = $('li:not(.selected)').length
    $('.item-length').text(count)
  }

  // 復原已刪除的項目
  function recoveryItem(item) {
    $recovery.on('click', { item }, function (e) {
      if (item.length > 0) {
        $ul.append(`<li>${e.data.item}</li>`)
        updateCount()
        item = ''
      }
    })
  }

  // 新增項目
  $form.on('submit', function (e) {
    e.preventDefault()
    let item = $inputText.val()
    let $body = $('body')
    if ((item !== '') && (item.length <= 35)) {
      // 新增一項目
      $ul.append(`<li>${item}</li>`)
      // 清空輸入欄位
      $inputText.val('')
      // 更新項目計數器
      updateCount()
    } else if (item === '') {
      // 若輸入欄位為空, 則顯示警示語
      $(this).prepend(`
        <div class="alert-word">
          <i class="fas fa-exclamation-triangle"></i>Please enter something.
        </div>
      `)
      $inputText.css({
        'border': '2px solid #b22222'
      })

    } else {
      // 若輸入字數 > 35, 則顯示警示語
      $(this).prepend(`
        <div class="alert-word">
          <i class="fas fa-exclamation-triangle"></i>The text is full.
        </div>
      `)
      $inputText.css({
        'border': '2px solid #b22222'
      })
      // 清空輸入欄位
      $inputText.val('')
    }
    // 清除警示語
    $body.on('click', function () {
      $('.alert-word').remove()
      $inputText.css({
        'border': 'none'
      })
    })
  })

  // 刪除項目
  $ul.on('click', 'li', function () {
    let $this = $(this)
    // 刪除該筆項目的內容
    let item = $this.html()

    $this.addClass('selected')
    // 刪除該筆項目
    $this.on('click', function () {
      let selected = $this.hasClass('selected')
      if (selected) {
        $this.animate({
          opacity: 0,
          marginLeft: '+=180'
        }, 480, 'swing', function () {
          $this.remove()
          // 更新項目計數器
          updateCount()
          // 刪除該筆項目的內容送入 recoveryItem function
          recoveryItem(item)
        })
      }
    })
  })
})





/*

功能 :
1. 新增、刪除待辦事項
2. 復原已刪除的待辦事項
3. 紀錄待辦事項的總數量

技術 :
1. 以動畫顯示預設的待辦事項
2. 以動畫刪除待辦事項



*/