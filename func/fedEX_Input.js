const GetInternationalRatesQuotes = (data) => {
  return {
    accountNumber: {
      value: process.env.FEDEX_ACCOUNT_NUMBER,
    },
    requestedShipment: {
      shipper: {
        address: {
          postalCode: data.shipper.address.postalCode,
          countryCode: data.shipper.address.countryCode,
        },
      },
      recipient: {
        address: {
          postalCode: data.recipient.address.postalCode,
          countryCode: data.recipient.address.countryCode,
        },
      },
      shipDateStamp: data.shipDateStamp,
      pickupType: data.pickupType,
      serviceType: data.serviceType,
      shipmentSpecialServices: {
        specialServiceTypes: ["RETURN_SHIPMENT"],
        returnShipmentDetail: {
          returnType: "PRINT_RETURN_LABEL",
        },
      },
      rateRequestType: ["ACCOUNT", "LIST"],
      customsClearanceDetail: {
        dutiesPayment: {
          paymentType: "SENDER",
          payor: {
            responsibleParty: null,
          },
        },
        commodities: [
          {
            description: "Camera",
            quantity: 1,
            quantityUnits: "PCS",
            weight: {
              units: "KG",
              value: 11,
            },
            customsValue: {
              amount: 100,
              currency: "SFR",
            },
          },
        ],
      },
      requestedPackageLineItems: [
        {
          weight: {
            units: data.weight.units,
            value: data.weight.value,
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
          personName: data.shipper.contact.personName,
          phoneNumber: data.shipper.contact.phoneNumber,
        },
        address: {
          streetLines: data.shipper.address.streetLines,
          city: data.shipper.address.city,
          stateOrProvinceCode: data.shipper.address.stateOrProvinceCode,
          postalCode: data.shipper.address.postalCode,
          countryCode: data.shipper.address.countryCode,
        },
      },
      recipients: [
        {
          contact: {
            personName: data.recipients.contact.personName,
            phoneNumber: data.recipients.contact.phoneNumber,
          },
          address: {
            streetLines: data.recipients.address.streetLines,
            city: data.recipients.address.city,
            stateOrProvinceCode: data.recipients.address.stateOrProvinceCode,
            postalCode: data.recipients.address.postalCode,
            countryCode: data.recipients.address.countryCode,
          },
        },
      ],
      shipDatestamp: data.shipDateStamp,
      serviceType: data.serviceType,
      packagingType: data.packagingType,
      pickupType: data.pickupType,
      blockInsightVisibility: false,
      shippingChargesPayment: {
        paymentType: "SENDER",
      },
      labelSpecification: {
        imageType: "PDF",
        labelStockType: "PAPER_85X11_TOP_HALF_LABEL",
      },
      customsClearanceDetail: data.customsClearanceDetail,
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
            units: data.weight.units,
            value: data.weight.value,
          },
        },
      ],
    },
    accountNumber: {
      value: process.env.FEDEX_ACCOUNT_NUMBER,
    },
  };
};

const US_DomesticReturnLabel = (data) => {
  return {
    labelResponseOptions: "URL_ONLY",
    requestedShipment: {
      shipper: {
        contact: {
          personName: data.shipper.contact.personName,
          phoneNumber: data.shipper.contact.phoneNumber,
        },
        address: {
          streetLines: data.shipper.address.streetLines,
          city: data.shipper.address.city,
          stateOrProvinceCode: data.shipper.address.stateOrProvinceCode,
          postalCode: data.shipper.address.postalCode,
          countryCode: data.shipper.address.countryCode,
        },
      },
      recipients: [
        {
          contact: {
            personName: data.recipients.contact.personName,
            phoneNumber: data.recipients.contact.phoneNumber,
          },
          address: {
            streetLines: data.recipients.address.streetLines,
            city: data.recipients.address.city,
            stateOrProvinceCode: data.recipients.address.stateOrProvinceCode,
            postalCode: data.recipients.address.postalCode,
            countryCode: data.recipients.address.countryCode,
          },
        },
      ],
      shipDatestamp: data.shipDateStamp,
      serviceType: data.serviceType,
      packagingType: data.packagingType,
      pickupType: data.pickupType,
      blockInsightVisibility: false,
      shippingChargesPayment: {
        paymentType: "SENDER",
      },
      shipmentSpecialServices: {
        specialServiceTypes: ["RETURN_SHIPMENT"],
        returnShipmentDetail: {
          returnType: "PRINT_RETURN_LABEL",
        },
      },
      labelSpecification: {
        imageType: "PDF",
        labelStockType: "PAPER_85X11_TOP_HALF_LABEL",
      },
      requestedPackageLineItems: [
        {
          weight: {
            value: 1,
            units: "LB",
          },
        },
      ],
    },
    accountNumber: {
      value: process.env.FEDEX_ACCOUNT_NUMBER,
    },
  };
};

const US_DomesticRateShop = (data,serviceType) => {
  //console.log(data)
  return {
    accountNumber: {
      value: process.env.FEDEX_ACCOUNT_NUMBER,
    },
    rateRequestControlParameters: {
      returnTransitTimes: true
    },
    requestedShipment: {
      shipper: {
        address: {
          postalCode: data.shipper.address.postalCode,
          countryCode: data.shipper.address.countryCode,
        },
      },
      recipient: {
        address: {
          postalCode: data.recipient.address.postalCode,
          countryCode: data.recipient.address.countryCode,
        },
      },
      pickupType: "USE_SCHEDULED_PICKUP",
      serviceType: serviceType,
      rateRequestType: ["ACCOUNT", "LIST"],
      requestedPackageLineItems: [
        {
          weight: {
            units: data.weight.units,
            value: data.weight.value,
          },
        },
      ],
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
              value: process.env.FEDEX_ACCOUNT_NUMBER,
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
  US_DomesticRateShop,
  GetInternationalRatesQuotes,
  createinternationalShipment,
  US_DomesticReturnLabel,
  validate,
};