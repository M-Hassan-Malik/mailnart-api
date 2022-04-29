const FEDEX_ACCOUNT_NUMBER = "510087380";

const GetInternationalGroundRates = (data) => {
  // console.log(JSON.stringify(data));
  return {
    accountNumber: {
      value: FEDEX_ACCOUNT_NUMBER,
    },
    requestedShipment: {
      shipper: data.shipper,
      recipient: data.recipient,
      shipDateStamp: data.shipDateStamp,
      pickupType: data.pickupType,
      serviceType: data.serviceType,
      rateRequestType: ["LIST"],
      requestedPackageLineItems: [
        {
          weight: {
            units: data.weigth.units,
            value: data.weigth.value,
          },
          dimensions: {
            length: data.dimensions.length,
            width: data.dimensions.width,
            height: data.dimensions.height,
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
      shipper: {
        address: {
          city: "Beverly Hills",
          stateOrProvinceCode: "CA",
          countryCode: "US",
        },
        contact: {
          phoneNumber: "+12038937991",
        },
      },
      recipients: [
        {
          address: {
            city: "San Francisco",
            stateOrProvinceCode: "CA",
            countryCode: "US",
          },
          contact: {
            phoneNumber: "12038937991",
          },
        },
      ],
      pickupType: "DROPOFF_AT_FEDEX_LOCATION",
      serviceType: "FEDEX_2_DAY_FREIGHT",
      packagingType: "FEDEX_BOX",
      shippingChargesPayment: {
        paymentType: "SENDER",
      },
      labelSpecification: {
        labelStockType: "STOCK_4X675",
        imageType: "ZPLII",
      },
      requestedPackageLineItems: [
        {
          weight: {
            units: "KG",
            value: 9,
          },
        },
      ],
    },
    labelResponseOptions: "URL_ONLY",
    accountNumber: {
      value: FEDEX_ACCOUNT_NUMBER,
    },
  };
};

const validate = (data) => {
  return {
    requestedShipment: {
      pickupType: "DROPOFF_AT_FEDEX_LOCATION",
      serviceType: "FEDEX_2_DAY_FREIGHT",
      packagingType: "FEDEX_ENVELOPE",
      shipper: {
        address: {
          streetLines: ["10 FedEx Parkway, Suite 302."],
          city: "Beverly Hills",
          stateOrProvinceCode: "CA",
          countryCode: "US",
        },
        contact: {
          personName: "Hassan Sohail",
          emailAddress: "gokulast14@gmail.com",
          phoneNumber: "91837462890",
        },
      },
      recipients: [
        {
          address: {
            streetLines: ["10 FedEx Parkway, Suite 302."],
            city: "San Francisco",
            stateOrProvinceCode: "CA",
            countryCode: "US",
          },
          contact: {
            personName: "Mohsin Sohail",
            phoneExtension: "91",
            emailAddress: "mhassan.malik.1997@gmail.com",
            phoneNumber: "91837962890",
          },
        },
      ],
      shippingChargesPayment: {
        paymentType: "SENDER",
        payor: {
          responsibleParty: {
            address: {
              streetLines: ["10 FedEx Parkway, Suite 302."],
              city: "Beverly Hills",
              stateOrProvinceCode: "CA",
              countryCode: "US",
            },
            contact: {
              personName: "Mohsin Sohail",
              phoneExtension: "91",
              emailAddress: "mhassan.malik.1997@gmail.com",
              phoneNumber: "91837962890",
            },
            accountNumber: {
              value: FEDEX_ACCOUNT_NUMBER,
            },
          },
        },
      },
      labelSpecification: {
        labelStockType: "PAPER_4X675",
        imageType: "ZPLII",
      },
      labelOrder: "SHIPPING_LABEL_FIRST",
      rateRequestType: ["LIST"],
      requestedPackageLineItems: [
        {
          weight: {
            units: "KG",
            units: 10,
          },
        },
      ],
    },
  };
};

module.exports = {
  GetInternationalGroundRates,
  createShipment,
  validate,
};
