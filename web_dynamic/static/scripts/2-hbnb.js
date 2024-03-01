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
});
