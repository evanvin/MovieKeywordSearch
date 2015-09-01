var pageNumber = 1;
var $loading = $('#loadingDiv').hide();
$(document).ajaxStart(function() {
    $loading.show();
}).ajaxStop(function() {
    $loading.hide();
}).ajaxComplete(function() {
    $loading.hide();
});

$('#sortBySelect').change(function() {
    searchMovies();
});
$('#orderBySelect').change(function() {
    searchMovies();
});



$(document).ready(function() {
		
        $('#genreSelect').multiselect({
			maxHeight: 150,
			buttonWidth: '100%'
		});
		
		
		$('#movieTVSelect').multiselect({
			maxHeight: 150,
			buttonWidth: '100%',
			  onChange: function(option, checked) {
				   var values = [];
                    $('#movieTVSelect option').each(function() {
                        if ($(this).val() !== option.val()) {
                            values.push($(this).val());
                        }
                    });
 
                    $('#movieTVSelect').multiselect('deselect', values);
            }
		});
		
		$("#ratingSlider").slider({tooltip_position:'middle'});		
		
		$('#keywordTags').tagsinput({
			typeahead: {
				name: 'keywords',
			   source: keywordData
			}
		});		
		
		$('#keywordTags').tagsinput('focus');
		
		//back to top functionality
		 var offset = 220;
		var duration = 500;
		jQuery(window).scroll(function() {
			if (jQuery(this).scrollTop() > offset) {
				jQuery('.back-to-top').fadeIn(duration);
			} else {
				jQuery('.back-to-top').fadeOut(duration);
			}
		});
		
		jQuery('.back-to-top').click(function(event) {
			event.preventDefault();
			jQuery('html, body').animate({scrollTop: 0}, duration);
			return false;
		})
});

function searchMovies() {
    pageNumber = 1;
    $('#resultBody').empty();
	$('#loadMoreDiv').empty();
    showSearchResults("new search");
}

function loadMore() {
    $('#loadMoreId').remove();
    showSearchResults("load more");
}

function showSearchResults(clearingIndicator){
	$('#numberOfResults').empty();
	
	if(clearingIndicator == 'new search'){
		$('#resultBody').empty();
	}
	$('#loadMoreDiv').empty();
	
	if ($("#keywordTags").tagsinput('items') == null || $("#keywordTags").tagsinput('items').length <= 0) {
        $("#keywordTags").closest(".form-group").find(".bootstrap-tagsinput").css('border-color', '#a94442');
        return;
    } else {
        $("#keywordTags").closest(".form-group").find(".bootstrap-tagsinput").css('border-color', '#ccc');
        var urlStart = "http://www.imdb.com/search/keyword?";
        var urlModeSort = "&mode=detail&page=" + pageNumber + "&sort=" + $('#sortBySelect').val() + "," + $(
            '#orderBySelect').val();
        var urlKeywords = "";
        var urlEnd = "";
        var ref = "";
        if ($("#keywordTags").tagsinput('items') != null && $("#keywordTags").tagsinput('items').length > 0) {
            var arr = [];
            $.each($("#keywordTags").tagsinput('items'), function(i, val) {
                val = val.toLowerCase();
                val = val.replace(" ", "-");
                arr.push(val);
            });
            ref = "ref_=kw_ref_key";
            urlKeywords += "keywords=" + arr.join("%2C");
        }
        if ($('#genreSelect').val() != null && $('#genreSelect').val().length > 0) {
            ref = "ref_=kw_ref_gnr";
            urlEnd += "&genres=" + $('#genreSelect').val().join("%2C");
        }
        if ($('#movieTVSelect').val() != null && $('#movieTVSelect').val().length > 0) {
            ref = "ref_=kw_ref_typ";
            urlEnd += "&title_type=" + $('#movieTVSelect').val().join();
        }
        if ($('#ratingSlider').val() != null && $('#ratingSlider').val() != "") {
            ref = "ref_=kw_ref_rt_usr";
            urlEnd += "&user_rating=" + $('#ratingSlider').val().replace(",", "%2C");
        }
        if ($("#keywordTags").tagsinput('items') != null && $("#keywordTags").tagsinput('items').length > 0) {
            ref = "&" + ref;
        }
        var url = urlStart + urlKeywords + ref + urlModeSort + urlEnd;
        $.ajaxPrefilter(function(options) {
            if (options.crossDomain && jQuery.support.cors) {
                var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
                //options.url = "http://cors.corsproxy.io/url=" + options.url;
            }
        });
		
        $.ajax({
            url: url,
            success: function(data) {
                //	console.log(url);
				var myRegexp = /of (.*?) titles/g;
				var numResults = myRegexp.exec(data);
				
				data = data.replace(/(?:\r\n|\r|\n)/g, '');
                var $jQueryObject = $($.parseHTML(data));
                var movies = [];
                $.each($jQueryObject.find(".lister-item.mode-detail"), function(index, value) {
                    var v = $(value);
                    var result = {
                        "title": v.find('.lister-item-content .lister-item-header a').html(),
                        "movieID": v.find('.lister-item-image').attr('data-tconst'),
                        "image": v.find('.lister-item-image img').attr('loadlate'),
                        "year": v.find(
                            '.lister-item-content .lister-item-header .lister-item-year'
                        ).html().replace('(', "").replace(')', ""),
                        "certificate": v.find('.lister-item-content .certificate').html(),
                        "runtime": v.find('.lister-item-content .runtime').html(),
                        "genre": v.find('.lister-item-content .genre').html(),
                        "synopsis": v.find('.lister-item-content .ratings-bar').next('p').html()
                    };
                    movies.push(result);
                });
                
				
				if (movies == null || movies <= 0) {
					//$('#resultBody').append("<span>NO RESULTS</span>");
					$('#numberOfResults').html('<span>0 results</span><br>');
				} else {					
					$.each(movies, function(index, value) {
						if(movies.length <= 50 && numResults == null)
							$('#numberOfResults').html('<span>' + movies.length + ' results</span><br>');
						else
							$('#numberOfResults').html('<span>' + numResults[1] + ' results</span><br>');
						
						if(value.synopsis.indexOf("<a href") > 0){
							value.synopsis = value.synopsis.substring(0,value.synopsis.indexOf("<a href"));
						}
						var descrip = value.title + ' - ' + value.year + '&#13;' + value.genre + '&#13;' + value.runtime + ' - ' + value.certificate + '&#13;' + value.synopsis;
						$('#resultBody').append(
							'<span class="grid-block" id="GridBlockID"><span class="movieblock" id="' + value.title + '"><a target="_blank" href="http://www.imdb.com/title/' +
							value.movieID + '/?ref_=kw_li_tt"><img src="' + value.image +
							'" title="' + descrip +
							'"/></a></span><br><div style="height:75px; width: 140px !important; overflow:hidden;">' +
							value.title + '</div></span>');
					});
					pageNumber++;
					$("#loadMoreDiv").append('<button type="button" class="btn btn-warning btn-lg center-block" onclick="loadMore();">Load More</button>')
				}
				
            }
        });
    }
}

function clearForm(){
	pageNumber = 1;
    $('#resultBody').empty();
	$('#loadMoreDiv').empty();
	$("option:selected").removeAttr('selected');
	$('#keywordTags').tagsinput('removeAll');
	$("#genreSelect").multiselect('refresh');
	$("#movieTVSelect").multiselect('refresh');
	$('#ratingSlider').slider('setValue', [1,10]);
	$('#keywordTags').tagsinput('focus');
}