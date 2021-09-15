const items = [
  {"item":"apple","type":"Fuji","weight":10,"pricePerKilo":"$3"},
  {"item":"orange","type":"Clementine","weight":6,"pricePerKilo":"$7"},
  {"item":"watermelon","type":"Nova","quantity":1,"pricePerItem":"$5"},
  {"item":"orange","type":"Navel","weight":6,"pricePerKilo":"$7"},
  {"item":"pineapple","type":"Queen","quantity":4,"pricePerItem":"$15"},
  {"item":"pineapple","type":"Pernambuco","quantity":3,"pricePerItem":"$12"},
  {"item":"apple","type":"Cameo","weight":6,"pricePerKilo":"$7"},
  {"item":"watermelon","type":"Trio","quantity":2,"pricePerItem":"$9"},
  {"item":"pineapple","type":"Red Spanish","quantity":3,"pricePerItem":"$9,99"},
  {"item":"watermelon","type":"Millionaire","quantity":2,"pricePerItem":"$7"},
  {"item":"orange","type":"Tangerine","weight":4,"pricePerKilo":"$4,99"},
  {"item":"apple","type":"Jazz","weight":4,"pricePerKilo":"$5"}
];

function sortItemsByItemField(a, b) {
  const itemA = a.item.toUpperCase();
  const itemB = b.item.toUpperCase();

  if (itemA < itemB) return -1;
  if (itemA > itemB) return 1;
  return 0;
};

function getPrice(value) {
	return Number(value.split('$')[1].replace(',', '.'));
}

function getCostPerKilo(item) {
	return getPrice(item.pricePerKilo) * item.weight;
}

function getCostPerItem(item) {
	return getPrice(item.pricePerItem) * item.quantity;
}

function sortItemsByCost(a, b) {
	const costA = a.pricePerKilo ? getCostPerKilo(a) : getCostPerItem(a);
	const costB = b.pricePerKilo ? getCostPerKilo(b) : getCostPerItem(b);

	return costA - costB;
};

function isItemValid(value) {
	let isValid = true;
	const propertyTypes = [
		{
			name: 'item',
			type: 'string'
		},
		{
			name: 'type',
			type: 'string'
		},
		{
			name: 'weight',
			type: 'number'
		},
		{
			name: 'quantity',
			type: 'number'
		},
		{
			name: 'pricePerKilo',
			type: 'string'
		},
		{
			name: 'pricePerItem',
			type: 'string'
		},
	];

	Object.entries(value).forEach(([key, val]) => {
		const selectedType = propertyTypes.find((type) => key === type.name);

		if (typeof val !== selectedType.type) {
			isValid = false;
		}
	})

	return isValid;
}

function stocktaking(items) {
	let watermelonsQuantity = 0;
	let applesWeight = 0;
	let cheapestOrange = null;
	let costApples = 0;
	let costPineapples = 0;
	let costWatermelons = 0;
	let costOranges = 0;

	items.forEach(item => {
		if (!isItemValid(item)) throw new Error('Wrong data format');

		switch(item.item) {
		  case 'watermelon':
				watermelonsQuantity += item.quantity;
				costWatermelons += getPrice(item.pricePerItem);
		    break;
		  case 'apple':
  			applesWeight += item.weight;
				costApples += getPrice(item.pricePerKilo);
		    break;
		  case 'orange':
				costOranges += getPrice(item.pricePerKilo);

				if (!cheapestOrange) {
					cheapestOrange = item;
				} else {
					if (getPrice(cheapestOrange.pricePerKilo) > getPrice(item.pricePerKilo)) {
						cheapestOrange = item;
					}
				}
		    break;
		  case 'pineapple':
				costPineapples += getPrice(item.pricePerItem);
		    break;
		}
	})

	console.log(`Watermelons - ${watermelonsQuantity}`);
	console.log(`Apples - ${applesWeight}`);
	console.log(items.sort(sortItemsByItemField));
	console.log(items.sort(sortItemsByCost));
	console.log(`The cheapest orange type is: ${cheapestOrange.type}`);
	console.log(`Apples - ${costApples}, Pineapples - ${costPineapples}, Watermelons - ${costWatermelons}, Oranges - ${costOranges}`);

  return 'Done!';
};

console.log(stocktaking(items));

module.exports = stocktaking;
