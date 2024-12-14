
const get_icon_filename = (charname, type) => {
	if (!small_icon[charname] || !big_icon[charname]){
		console.error('Character not found in the database.');
        return null;
	}
	if (type == 'small') {
		return small_icon[charname].split('/').pop();
		
	} else if (type == 'big') {
        return big_icon[charname].split('/').pop();
	} else {
		console.error('Invalid type. Choose either "small" or "big".');
        return null;
	}
}

const small_img_path = '/img/small_icons/';
const big_img_path = '/img/big_icons/';
const items_img_path = '/img/items/';

const get_img_url = (charname, type) => {
	if (!small_icon[charname] || !big_icon[charname]){
		console.error('Character not found in the database.');
        return null;
	}
	if (type =='small') {
        return small_img_path + get_icon_filename(charname,'small');
    } else if (type == 'big') {
        return big_img_path + get_icon_filename(charname, 'big');
    } else {
        console.error('Invalid type. Choose either "small" or "big".');
        return null;
    }

}

const get_item_url = (key) => {
	const item = icon_items.find(i => i.key === key);
    if (!item) {
        console.error('Item not found in the database.');
        return null;
    }
    return items_img_path + item.value;
}



for (const charname in small_icon) {
	const small_img = document.createElement('img');
    small_img.src = get_img_url(charname,'small');
	const big_img = document.createElement('img');
    big_img.src = get_img_url(charname, 'big');

	small_img.onclick = () => {
		$('.char').html(big_img);
		$('.charlist').hide();
	}
	$('.charlist').append(small_img)
}

icon_items.sort( (a, b) => b.color - a.color);

const colors = [
	'black', 'blue', 'purple', 'golden'
]

//display all items
for (const item of icon_items) {
	const itemdiv = $('<div />', {class: 'item-div'});
	const itemcard = $('<div />', {class: 'item'});

	itemcard.on('click', function () {
        $(this).next('.item-text').toggle();
    });

	itemcard.mousedown( function (e) { 
		if( e.button == 2 ) { //2  - правый клик
			$(this).toggle();
		} 
	}); 
	
	itemcard.append($('<div />', {class: 'item-img'}).append($('<img />', {src: get_item_url(item.key)})));
	itemcard.append($('<div />', {class: `item-color ${colors[item.color]}`}));
	const itemtext = $('<div />', {class: `item-text ${colors[0]}`, contenteditable:"true"});
	itemdiv.append(itemcard);
	itemdiv.append(itemtext);
	$('.itemlist').append(itemdiv);
}


/*
//display all images


for (const charname in big_icon) {
	const div = document.createElement('div');
    div.textContent = charname;
    document.body.appendChild(div);

    const big_img = document.createElement('img');
    big_img.src = get_img_url(charname, 'big');
    document.body.appendChild(big_img);
}
*/