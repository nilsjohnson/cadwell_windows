var door_images = [
	"images/doors/FiskResidence.JPG",
	"images/doors/IMG_0018.JPG",
	"images/doors/IMG_3726.JPG",
	"images/doors/IMG_6075.JPG",
	"images/doors/TFrontDoorNoLamp.jpg"
	
	
]
var window_images = [
	"images/windows/IMG_5028.JPG",
	"images/windows/IMG_0844.JPG",
	"images/windows/FittingSashtoFrame.JPG",
	"images/windows/Fisk12over12.jpg",
	"images/windows/IMG_4981.JPG",
	"images/windows/EnfieldSash.JPG",
	
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
	var images;
	switch(page)
	{
		case "doors.html":
			images = door_images;
			break;
		case "windows.html":
			images = window_images;
			break;
	}
	var curIndex = 0;
	var sourceStr = $('#modal-image')[0].src;
	var currentImage = sourceStr.split('/').pop();
	for(var i = 0; i < images.length; i++)
	{
		if(currentImage == images[i].split('/').pop())
		{
			curIndex = i;
			break;
		}
	}

	var newIndex = curIndex + step;
	if(newIndex < 0)
	{
		newIndex = images.length - 1;
	}
	else if(newIndex > images.length - 1)
	{
		newIndex = 0;
	}

	var srcString = images[newIndex];
	$('#modal-image').attr('src', srcString);
}