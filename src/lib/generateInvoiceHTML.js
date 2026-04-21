export const generateInvoiceHTML = (orderData, user) => {
  const itemsList = orderData.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 12px 0; display: flex; align-items: center;">
          <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; margin-right: 12px; border: 1px solid #eee;">
          <span style="color: #555; font-weight: 500;">${item.title}</span>
        </td>
        <td style="padding: 12px 0; color: #555; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px 0; color: #333; text-align: right; font-weight: bold;">${(item.price * item.quantity).toLocaleString()} TK</td>
      </tr>`
    )
    .join("");

  return `
    <div style="max-width: 600px; margin: 20px auto; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; border: 1px solid #e4e4e4; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      <div style="background-color: #f8f9fa; padding: 30px; border-bottom: 2px solid #007bff;">
        <table style="width: 100%;">
          <tr>
            <td>
              <h1 style="margin: 0; color: #333; font-size: 24px;">INVOICE</h1>
              <p style="margin: 5px 0 0; color: #777; font-size: 14px;">Order #${orderData._id?.toString().slice(-6).toUpperCase() || 'N/A'}</p>
            </td>
            <td style="text-align: right;">
              <div style="font-weight: bold; color: #007bff; font-size: 20px;">KIDZ COMMERCE</div>
            </td>
          </tr>
        </table>
      </div>

      <div style="padding: 30px;">
        <p style="font-size: 16px; color: #333;">Dear <strong>${user.name}</strong>,</p>
        <p style="color: #666; font-size: 14px; line-height: 1.5;">Your order has been successfully received and is being processed. Below are your transaction details.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="text-align: left; border-bottom: 2px solid #eee;">
              <th style="padding-bottom: 10px; color: #888; font-size: 12px; text-transform: uppercase;">Item Description</th>
              <th style="padding-bottom: 10px; color: #888; font-size: 12px; text-transform: uppercase; text-align: center;">Qty</th>
              <th style="padding-bottom: 10px; color: #888; font-size: 12px; text-transform: uppercase; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
        </table>

        <table style="width: 100%; margin-top: 20px;">
          <tr>
            <td></td>
            <td style="width: 220px;">
              <table style="width: 100%; font-size: 14px;">
                <tr>
                  <td style="padding: 5px 0; color: #777;">Order Date:</td>
                  <td style="padding: 5px 0; text-align: right; color: #333;">${new Date(orderData.oderAt).toLocaleDateString()}</td>
                </tr>
                <tr style="font-size: 18px; font-weight: bold;">
                  <td style="padding: 20px 0 10px; color: #333;">Total Paid:</td>
                  <td style="padding: 20px 0 10px; text-align: right; color: #007bff;">${orderData.totalPrice.toLocaleString()} TK</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>

      <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
        <p style="margin: 0; color: #999; font-size: 12px;">Thank you for shopping with us!</p>
        <p style="margin: 5px 0 0; color: #999; font-size: 12px;">If you have any questions, contact us at shakil2006@gmail.com</p>
      </div>
    </div>
  `;
};