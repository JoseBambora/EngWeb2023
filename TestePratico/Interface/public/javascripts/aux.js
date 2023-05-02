$(function(){
    $('.tr').click(function() {
        console.log('entrou')
        // Get the ID of the exam from the href attribute of the row
        var examId = $(this).attr('id');
      
        // Redirect to the new page using the exam ID
        window.location.href = '/'+ examId;
    })
})