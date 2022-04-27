const FEDEX_ACCOUNT_NUMBER = "510087380";

const GetRatesInput = (data) => {
  return {
    accountNumber: {
      value: FEDEX_ACCOUNT_NUMBER,
    },
    rateRequestControlParameters: {
      returnTransitTimes: true,
      servicesNeededOnRateFailure: true,
    },
    requestedShipment: {
      shipDateStamp: data.shipDateStamp,
      shipper: data.shipper,
      recipient: data.recipient,
      pickupType: data.pickupType,
      pickupDetail: data.pickupDetail,
      serviceType: data.serviceType,
      rateRequestType: ["LIST"],
      requestedPackageLineItems: [
        {
          weight: {
            units: "LB",
            value: data.weught_value,
          },
          dimensions: {
            length: data.length,
            width: data.width,
            height: data.height,
            units: "IN",
          },
        },
      ],
    },
  };
};

const createShipment = (data) => {
  return {
    requestedShipment: {
      shipDatestamp: "2019-10-14",
      shipper: {
        address: {
          streetLines: ["10 FedEx Parkway, Suite 302.", "near FedEx Parkway"],
          city: "Beverly Hills",
          stateOrProvinceCode: "CA",
          postalCode: 90209,
          countryCode: "US",
          residential: true,
        },
        contact: {
          personName: "Hassan Sohail",
          phoneExtension: "92",
          emailAddress: "gokulast14@gmail.com",
          phoneNumber: "923130185010",
        },
      },
      recipients: [
        {
          address: {
            streetLines: ["20 FedEx Parkway, Suite #"],
            city: "San Francisco",
            stateOrProvinceCode: "CA",
            postalCode: 94105,
            countryCode: "US",
            residential: true,
          },
          contact: {
            personName: "Mohsin Sohail",
            phoneExtension: "92",
            emailAddress: "mhassan.malik.1997@gmail.com",
            phoneNumber: "923130285010",
          },
          deliveryInstructions: "Call me when you arrive!",
        },
      ],
      recipientLocationNumber: "Near Punjab PCO",
      pickupType: "CONTACT_FEDEX_TO_SCHEDULE",
      serviceType: "STANDARD_OVERNIGHT",
      packagingType: "FEDEX_LARGE_BOX",
      totalWeight: 10.6,
      shippingChargesPayment: {
        paymentType: "SENDER",
      },
      labelSpecification: "LABEL_DATA_ONLY",
      labelOrder: "SHIPPING_LABEL_FIRST",
      labelStockType: "PAPER_LETTER",
      imageType: "PDF",
      rateRequestType: ["LIST"],
      requestedPackageLineItems: [
        {
          weight: {
            units: "KG",
            units: 25.52,
          },
        },
      ],
    },
    labelResponseOptions: "LABEL",
    accountNumber: {
      value: "510087380",
    },
  };
};

module.exports = {
  GetRatesInput,
  createShipment,
};
