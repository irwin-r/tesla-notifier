module.exports = `
{{#added}}
The following demonstration car(s) are <strong>NEWLY</strong> available:

<ul>
    <li>
       <strong>Year:</strong> {{year}}<br/>
       <strong>Model:</strong> {{model}}<br/>
       {{#odometer}}
       <strong>Odometer:</strong> {{odometer}} {{odometerType}}
       {{/odometer}}
       <hr/>
       <strong>Exterior</strong>: {{paint}}<br/>
       <strong>Interior</strong>: {{interior}}
       <hr/>
       <strong>Price:</strong> {{price}}
       <hr/>
       <a href="https://www.tesla.com/en_AU/model3/order/{{vin}}?token={{token}}">Buy</a>
    </li>
</ul>
{{/added}}

{{#updated}}
The following demonstration car(s) have an <strong>UPDATED</strong> value:

<ul>
    <li>
       <strong>Year:</strong> {{year}}<br/>
       <strong>Model:</strong> {{model}}<br/>
       {{#odometer}}
       <strong>Odometer:</strong> {{odometer}} {{odometerType}}
       {{/odometer}}
       <hr/>
       <strong>Exterior</strong>: {{paint}}<br/>
       <strong>Interior</strong>: {{interior}}
       <hr/>
       <strong>Price:</strong> {{price}}<br/>
       <strong>Previous Prices:</strong> {{previousPrices}}
       <hr/>
       <a href="https://www.tesla.com/en_AU/model3/order/{{vin}}?token={{token}}">Buy</a>
    </li>
</ul>
{{/updated}}
`;
