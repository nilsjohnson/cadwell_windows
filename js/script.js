var door_images = [
	"images/doors/FiskResidence.jpg",
	"images/doors/IMG_0018.jpg",
	"images/doors/IMG_3726.jpg",
	"images/doors/IMG_6075.jpg",
	"images/doors/TFrontDoorNoLamp.jpg"
	
	
]
var window_images = [
	"images/windows/IMG_5028.jpg",
	"images/windows/IMG_0844.jpg",
	"images/windows/FittingSashtoFrame.jpg",
	"images/windows/Fisk12over12.jpg",
	"images/windows/IMG_4981.jpg",
	"images/windows/EnfieldSash.jpg",
	
]
var auditorium_images = [
	"guitars/auditorium/lightbox/rosewoodfront.jpg",
	"guitars/auditorium/lightbox/rosewoodback.jpg",
	"guitars/auditorium/lightbox/mahogfront.jpg",
	"guitars/auditorium/lightbox/mahogback.jpg"

]
var grandconcert_images = [
	"guitars/grand_concert/lightbox/grand_concert_front2.jpg",
	"guitars/grand_concert/lightbox/grand_concert_back2.jpg",
	"guitars/grand_concert/lightbox/grand_concert_front.jpg",
	"guitars/grand_concert/lightbox/grand_concert_back.jpg"
]
var concert_images = [
	"guitars/concert/lightbox/mahog_front.jpg",
	"guitars/concert/lightbox/mahog_back.jpg",
	"guitars/concert/lightbox/maple_burst_front.jpg",
	"guitars/concert/lightbox/maple_burst_back.jpg"
]
var parlor_images = [
	"guitars/parlor/lightbox/red_maple_front.jpg",
	"guitars/parlor/lightbox/red_maple_back.jpg",
	"guitars/parlor/lightbox/2front.jpg",
	"guitars/parlor/lightbox/2back.jpg"
]






var switchTo = function(objectId)
{
	var obj = $('#'+objectId);
	obj.siblings().hide();
	obj.show();
	$('.nav-pills .active').removeClass('active');
	$('#'+objectId+'-link').addClass('active');
}

var openLightbox = function(obj)
{
	$('#modal-image').attr('src', obj.src);
	$('#lightbox').modal('show');
}

var closeLightbox = function()
{
	$('#lightbox').modal('hide');
}

var switchLightbox = function(imageId)
{
	var source = $('#'+imageId)[0].src;
	if(source.indexOf("back") > 1)
	{
		source = source.replace('back', 'front');
	}
	else
	{
		source = source.replace('front', 'back');
	}	
	$('#' + imageId).attr('src', source);
}

var lightboxChange = function(step)
{
	var page = window.location.pathname.split('/').pop();
	console.log(page);
	var images;
	switch(page)
	{
		case "doors.html":
			images = door_images;
			break;
		case "windows.html":
			images = window_images;
			break;
		case "auditorium":
			images = auditorium_images;
			break;
		case "concert":
			images = concert_images;
			break;
		case "grandconcert":
			images = grandconcert_images;
			break;
		case "parlor":
			images = parlor_images;
			break;
						
	}
	console.log(images);
	var curIndex = 0;
	var sourceStr = $('#modal-image')[0].src;
	var currentImage = sourceStr.split('/').pop();
	console.log(currentImage);
	for(var i = 0; i < images.length; i++)
	{
		if(currentImage == images[i].split('/').pop())
		{
			console.log('found image');
			curIndex = i;
			break;
		}
	}
	console.log('current index: ' + curIndex);
	var newIndex = curIndex + step;
	if(newIndex < 0)
	{
		newIndex = images.length - 1;
	}
	else if(newIndex > images.length - 1)
	{
		newIndex = 0;
	}
	console.log(newIndex);
	var srcString = images[newIndex];
	console.log('new source: "' + srcString + '"');
	$('#modal-image').attr('src', srcString);
}