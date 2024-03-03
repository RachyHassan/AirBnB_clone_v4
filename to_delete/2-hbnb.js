$(document).ready(function () {
  const amenities = [];
  $('input.amenity-checkbox:checkbox').change(
    function () {
      if ($(this).is(':checked')) {
        amenities.push($(this).data('name'));
      } else {
        const index = amenities.indexOf($(this).data('name'));
        amenities.splice(index, 1);
      }
      $('div.amenities h4').text(amenities.join(', '));
    }
  );
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function (data) {
        if (data.status == 'OK') {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    }
  })
});
