var OLD_VALUES = {};

$(function(){
	$('textarea').on('keyup change blur', function(){
		var 
			self = $(this),
			val = self.val(),
			id
		;

		OLD_VALUES[id] = OLD_VALUES[id] || val;

		if ( OLD_VALUES[id] != val ){
			OLD_VALUES[id] = val;
			startGeneration();	
		}
	});

	startGeneration();
});

function startGeneration(){
	clearTimeout(window.startGenerationTimer);

	window.startGenerationTimer = setTimeout(function(){
		var
			html = $('#html').val(), 
			js = $('#js').val(), 
			css = $('#css').val()
		;

		console.log('generate call');

		generate(html, js, css);
	}, 200);
}

function generate(html, js, css){
	var 
		iframe,
		iframeDoc,
		finalHtml,
		bodyOpenTag = '<body>',
		bodyCloseTag = '</body>',
		bodyCloseTagPos
	;
	
	finalHtml = html;

	if ( finalHtml.indexOf(bodyOpenTag) == -1 ){
		finalHtml = bodyOpenTag + finalHtml;
	}

	if ( finalHtml.indexOf(bodyCloseTag) == -1 ){
		finalHtml = finalHtml + bodyCloseTag;
	}

	bodyCloseTagPos = finalHtml.indexOf(bodyCloseTag);

	finalHtml = 
		finalHtml.substring(0, bodyCloseTagPos) 
		+ '<style>'
		+ css
		+ '</style>'
		+ '<script> try {'
		+ js
		+ '} catch(e){}</script>'
		+ finalHtml.substring(bodyCloseTagPos);

	createIframe(finalHtml);
}

function createIframe(html){
	$('.preview').html('');

	iframe = document.createElement('iframe');

	document.querySelector('.preview').appendChild(iframe);

	iframeDoc = iframe.contentWindow.document;
	iframeDoc.open();
	iframeDoc.write(html);
	iframeDoc.close();
}