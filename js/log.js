var pageNumber = 1;
var $loading = $('#loadingDiv').hide();
$(document)
  .ajaxStart(function () {
    $loading.show();
  })
  .ajaxStop(function () {
    $loading.hide();
  })
  .ajaxComplete(function () {
    $loading.hide();
  });

$(document).ready(function(){
	
//	searchMovies();

});




function searchMovies(){
	
	pageNumber = 1;
	
	$('#resultBody').empty();
	
	if($("#keywordTags").tagsinput('items') == null || $("#keywordTags").tagsinput('items').length <= 0){
		$("#keywordTags").closest(".form-group").find(".bootstrap-tagsinput").css('border-color', '#a94442');
		return;
	}
	else{
		$("#keywordTags").closest(".form-group").find(".bootstrap-tagsinput").css('border-color', '#ccc');
	
	
	
	
		var urlStart = "http://www.imdb.com/search/keyword?";
		var urlModeSort = "&mode=detail&page=" + pageNumber + "&sort=" + $('#sortBySelect').val() + "," + $('#orderBySelect').val();
		var urlKeywords = "";
		var urlEnd = "";
		var ref = "";
		
		if($("#keywordTags").tagsinput('items') != null && $("#keywordTags").tagsinput('items').length > 0){
			var arr = [];
			
			$.each($("#keywordTags").tagsinput('items') , function( i, val ) {
				val = val.toLowerCase();
				val = val.replace(" ", "-");
				arr.push(val);			
			});
			ref = "ref_=kw_ref_key";
			urlKeywords += "keywords=" + arr.join("%2C");
		}
		
		if($('#genreSelect').val() != null && $('#genreSelect').val().length > 0){
			ref = "ref_=kw_ref_gnr";
			urlEnd += "&genres=" + $('#genreSelect').val().join("%2C");
		}
		
		if($('#movieTVSelect').val() != null && $('#movieTVSelect').val().length > 0){
			ref = "ref_=kw_ref_typ";
			urlEnd += "&title_type=" + $('#movieTVSelect').val().join();
		}
		
		if($('#ratingSlider').val() != null && $('#ratingSlider').val() != ""){
			ref = "ref_=kw_ref_rt_usr";
			urlEnd += "&user_rating=" + $('#ratingSlider').val().replace(",","%2C");
		}
		
		
		
		
		if($("#keywordTags").tagsinput('items') != null && $("#keywordTags").tagsinput('items').length > 0){
			ref = "&" + ref;	
		}
		
		
		
		var url = urlStart + urlKeywords + ref + urlModeSort + urlEnd;
		
		
		$.ajaxPrefilter( function (options) {
		  if (options.crossDomain && jQuery.support.cors) {
			var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
			options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
			//options.url = "http://cors.corsproxy.io/url=" + options.url;
		  }
		});
		
		
		$.ajax({ url: url, success: function(data) {
		//	console.log(url);
			data = data.replace(/(?:\r\n|\r|\n)/g, '');
			
			var movieIdRegex = /ribbonize["] data-tconst=["](.*?)["]/g;
			var movieIds = getMatches(data,movieIdRegex,1);
			
			
			
			
			var titleRegex = /kw_li_tt[."]>(.*?)</g;
			var matches = getMatches(data, titleRegex, 1);
			//console.log(matches.length + ' matches found: ' + JSON.stringify(matches));
			//console.log(matches);
			
			if(matches == null || matches <= 0){
				$('#resultBody').append("<span>NO RESULTS</span>");
			}
			else{
				var imageRegex = /kw_li_i[."]> (.*?)<[/]/g
				var imageMatches = getMatches(data, imageRegex, 1);
				//console.log(imageMatches);
				
				var linkReg = /loadlate=["](.*?)["]/g;
				var links = getMatches(data, linkReg, 1);
								
				$.each( imageMatches, function( index, value ){
					value = value.replace(/src=["](.*?)["]/g, ' src="' + links[index] + '" ');
					value = value.replace(/(<[^>]*)loadlate\s*=\s*('|")[^\2]*?\2([^>]*>)/g, "$1$3");
					value = value.replace(/class=["](.*?)["]/g, ' class="resultImage" title="' + matches[index] + '"');
					
					$('#resultBody').append('<span class="grid-block" id="GridBlockID"><span><a target="_blank" href="http://www.imdb.com/title/' + movieIds[index] + '/?ref_=kw_li_tt">' + value + '</a></span><br><div style="height:75px; width: 140px !important; overflow:hidden;">' + matches[index] + '</div></span>');
					
				});
				
				pageNumber++;
				$('#resultBody').append('<span id="loadMoreId" onclick="loadMore();">Load More</span>');
			}
			
					
			

					
			} 
		});
	}
	
	
	
	
	
	
}

$('#sortBySelect').change(function(){ searchMovies();})
$('#orderBySelect').change(function(){ searchMovies();})

function getMatches(string, regex, index) {
  index || (index = 1); // default to the first capturing group
  var matches = [];
  var match;
  while (match = regex.exec(string)) {
    matches.push(match[index]);
  }
  return matches;
}








function loadMore(){
	
	$('#loadMoreId').remove();
	
	if($("#keywordTags").tagsinput('items') == null || $("#keywordTags").tagsinput('items').length <= 0){
		$("#keywordTags").closest(".form-group").find(".bootstrap-tagsinput").css('border-color', '#a94442');
		return;
	}
	else{
		$("#keywordTags").closest(".form-group").find(".bootstrap-tagsinput").css('border-color', '#ccc');
	
	
	
	
		var urlStart = "http://www.imdb.com/search/keyword?";
		var urlModeSort = "&mode=detail&page=" + pageNumber + "&sort=" + $('#sortBySelect').val() + "," + $('#orderBySelect').val();
		var urlKeywords = "";
		var urlEnd = "";
		var ref = "";
		
		if($("#keywordTags").tagsinput('items') != null && $("#keywordTags").tagsinput('items').length > 0){
			var arr = [];
			
			$.each($("#keywordTags").tagsinput('items') , function( i, val ) {
				val = val.toLowerCase();
				val = val.replace(" ", "-");
				arr.push(val);			
			});
			ref = "ref_=kw_ref_key";
			urlKeywords += "keywords=" + arr.join("%2C");
		}
		
		if($('#genreSelect').val() != null && $('#genreSelect').val().length > 0){
			ref = "ref_=kw_ref_gnr";
			urlEnd += "&genres=" + $('#genreSelect').val().join("%2C");
		}
		
		if($('#movieTVSelect').val() != null && $('#movieTVSelect').val().length > 0){
			ref = "ref_=kw_ref_typ";
			urlEnd += "&title_type=" + $('#movieTVSelect').val().join();
		}
		
		if($('#ratingSlider').val() != null && $('#ratingSlider').val() != ""){
			ref = "ref_=kw_ref_rt_usr";
			urlEnd += "&user_rating=" + $('#ratingSlider').val().replace(",","%2C");
		}
		
		
		
		
		if($("#keywordTags").tagsinput('items') != null && $("#keywordTags").tagsinput('items').length > 0){
			ref = "&" + ref;	
		}
		
		
		
		var url = urlStart + urlKeywords + ref + urlModeSort + urlEnd;
		
		
		$.ajaxPrefilter( function (options) {
		  if (options.crossDomain && jQuery.support.cors) {
			var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
			options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
			//options.url = "http://cors.corsproxy.io/url=" + options.url;
		  }
		});
		
		
		$.ajax({ url: url, success: function(data) {
		//	console.log(url);
			data = data.replace(/(?:\r\n|\r|\n)/g, '');
			
			var movieIdRegex = /ribbonize["] data-tconst=["](.*?)["]/g;
			var movieIds = getMatches(data,movieIdRegex,1);
			
			
			
			
			var titleRegex = /kw_li_tt[."]>(.*?)</g;
			var matches = getMatches(data, titleRegex, 1);
			//console.log(matches.length + ' matches found: ' + JSON.stringify(matches));
			//console.log(matches);
			
			if(matches == null || matches <= 0){
				$('#resultBody').append("<span>NO RESULTS</span>");
			}
			else{
				var imageRegex = /kw_li_i[."]> (.*?)<[/]/g
				var imageMatches = getMatches(data, imageRegex, 1);
				//console.log(imageMatches);
				
				var linkReg = /loadlate=["](.*?)["]/g;
				var links = getMatches(data, linkReg, 1);
								
				$.each( imageMatches, function( index, value ){
					value = value.replace(/src=["](.*?)["]/g, ' src="' + links[index] + '" ');
					value = value.replace(/(<[^>]*)loadlate\s*=\s*('|")[^\2]*?\2([^>]*>)/g, "$1$3");
					value = value.replace(/class=["](.*?)["]/g, ' class="resultImage" title="' + matches[index] + '"');
					
					$('#resultBody').append('<span class="grid-block" id="GridBlockID"><span><a target="_blank" href="http://www.imdb.com/title/' + movieIds[index] + '/?ref_=kw_li_tt">' + value + '</a></span><br><div style="height:75px; width: 140px !important; overflow:hidden;">' + matches[index] + '</div></span>');
					
				});
				
				pageNumber++;
				$('#resultBody').append('<span id="loadMoreId" onclick="loadMore();">Load More</span>');
			}
			
					
			

					
			} 
		});
	}
	
}