export class VehicleDTO{
    constructor(vehicleId,vehicleBrand,vehicleCategory,vehicleType,
                vehicleSearchType,vehicleHybridOrNot,vehicleFuelType,
                vehicleFuelUsage,vehicleSeatCapacity,vehicleFee_for_1km,
                vehicleFee_for_Day,vehicleStatus,vehicleTransmissionType,
                vehicleDriverName,vehicleDriverContact) {

        this.vehicleId=vehicleId;
        this.vehicleBrand=vehicleBrand;
        this.vehicleCategory=vehicleCategory;
        this.vehicleType=vehicleType;
        this.vehicleSearchType=vehicleSearchType;
        this.vehicleHybridOrNot=vehicleHybridOrNot;
        this.vehicleFuelType=vehicleFuelType;
        this.vehicleFuelUsage=vehicleFuelUsage;
        this.vehicleSeatCapacity=vehicleSeatCapacity;
        this.vehicleFee_for_1km=vehicleFee_for_1km;
        this.vehicleFee_for_Day=vehicleFee_for_Day;
        this.vehicleStatus=vehicleStatus;
        this.vehicleTransmissionType=vehicleTransmissionType;
        this.vehicleDriverName=vehicleDriverName;
        this.vehicleDriverContact=vehicleDriverContact;
    }
}
new VehicleDTO();