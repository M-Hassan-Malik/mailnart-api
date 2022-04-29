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

const createinternationalShipment = (data) => {
  return {
    labelResponseOptions: "URL_ONLY",
    requestedShipment: {
      shipper: {
        contact: {
          personName: "SHIPPER NAME",
          phoneNumber: 1234567890,
        },
        address: {
          streetLines: ["SHIPPER STREET LINE 1"],
          city: "Memphis",
          stateOrProvinceCode: "TN",
          
          countryCode: "US",
        },
      },
      recipients: [
        {
          contact: {
            personName: "RECIPIENT NAME",
            phoneNumber: 1234567890,
            companyName: "Recipient Company Name",
          },
          address: {
            streetLines: [
              "RECIPIENT STREET LINE 1",
              "RECIPIENT STREET LINE 2",
              "RECIPIENT STREET LINE 3",
            ],
            city: "RICHMOND",
            stateOrProvinceCode: "BC",
            countryCode: "CA",
          },
        },
      ],
      shipDatestamp: "2022-04-29",
      serviceType: "INTERNATIONAL_PRIORITY",
      packagingType: "YOUR_PACKAGING",
      pickupType: "USE_SCHEDULED_PICKUP",
      blockInsightVisibility: false,
      shippingChargesPayment: {
        paymentType: "SENDER",
      },
      labelSpecification: {
        imageType: "PDF",
        labelStockType: "PAPER_85X11_TOP_HALF_LABEL",
      },
      customsClearanceDetail: {
        dutiesPayment: {
          paymentType: "SENDER",
        },
        isDocumentOnly: true,
        commodities: [
          {
            description: "Commodity description",
            countryOfManufacture: "US",
            quantity: 1,
            quantityUnits: "PCS",
            unitPrice: {
              amount: 100,
              currency: "USD",
            },
            customsValue: {
              amount: 100,
              currency: "USD",
            },
            weight: {
              units: "LB",
              value: 20,
            },
          },
        ],
      },
      shippingDocumentSpecification: {
        shippingDocumentTypes: ["COMMERCIAL_INVOICE"],
        commercialInvoiceDetail: {
          documentFormat: {
            stockType: "PAPER_LETTER",
            docType: "PDF",
          },
        },
      },
      requestedPackageLineItems: [
        {
          weight: {
            units: "LB",
            value: 70,
          },
        },
      ],
    },
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
 createinternationalShipment,
  validate,
};
