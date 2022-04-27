const FEDEX_ACCOUNT_NUMBER = "510087380";

const GetRatesInput = (data) => {
    return {
        accountNumber: {
            value: FEDEX_ACCOUNT_NUMBER,
        },
        rateRequestControlParameters: {
            returnTransitTimes: true,
            servicesNeededOnRateFailure: true
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
            totalDeclaredValue: {
                amount: 12.45,
                currency: "USD"
            },
            shipper: {
                address: {
                    streetLines: ["", ""],
                    city: "Beverly Hills",
                    stateOrProvinceCode: "CA",
                    postalCode: 65247,
                    countryCode: "US",
                    residential: false,
                },
                contact: {
                    personName: "",
                    emailAddress: "",
                    phoneNumber: "",
                },
            },
            recipients: [{
                address: {
                    streetLines: [""],
                    city: "",
                    stateOrProvinceCode: "",
                    postalCode: "",
                    countryCode: "",
                    residential: ""
                },
                contact: {
                    personName: "",
                    emailAddress: "",
                    phoneNumber: "",
                    companyName: "",
                },
                deliveryInstructions: ""
            }
            ],
            recipientLocationNumber: "",
            pickupType: "CONTACT_FEDEX_TO_SCHEDULE",
            serviceType: "STANDARD_OVERNIGHT",
            packagingType: "FEDEX_LARGE_BOX",
            totalWeight: 10.6,
            shippingChargesPayment: {
                paymentType: "SENDER",
                payor: {
                    responsibleParty: {
                        address: {
                            streetLines: "",
                            city: "",
                            stateOrProvinceCode: "",
                            countryCode: "",
                            postalCode: "",
                            countryCode: "",
                        },
                        contact: {
                            personName: "",
                            emailAddress: "",
                            phoneNumber: ""
                        },
                        accountNumber: {
                            value: ""
                        },
                    }
                }
            },
            labelSpecification: "COMMON2D",
            labelOrder: "SHIPPING_LABEL_FIRST",
            labelStockType: "PAPER_85X11_BOTTOM_HALF_LABEL",
            imageType: "ZPLII",
            requestedPackageLineItems: [{
                weight: {
                    units: "KG",
                    units: 68.52
                }
            }]

        },
        labelResponseOptions: "LABEL",
        accountNumber: {
            value: ""
        },

    };
};

module.exports = {
    GetRatesInput,
    createShipment
}