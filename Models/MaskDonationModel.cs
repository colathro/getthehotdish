﻿using getthehotdish.DataAccess;
using getthehotdish.Utils;
using getthehotdish.Utils.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;

namespace getthehotdish.Models
{
    public class MaskDonationModel
    {
        public Guid Id { get; set; }
        public string PartitionKey { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Status { get; set; }
        [Required]
        public DonatorModel Donator { get; set; }
        [Required]
        public List<MaskInfoModel> Donation { get; set; }
        [Required]
        public string RequestId { get; set; }
        public MaskRequestModel Request { get; set; }

        public MaskDonationModel()
        {
        }
        public MaskDonationModel(MaskDonation maskDonation)
        {
            maskDonation.ToMaskDonationModel();
        }

        public MaskDonation ToMaskDonation()
        {
            return new MaskDonation
            {
                Id = Id,
                PartitionKey = PartitionKey,
                CreatedOn = CreatedOn,
                Status = EnumUtils.GetValue<DonationStatus>(Status),
                Donator = Donator.ToDonator(),
                Donation = Donation.Select(d => d.ToMaskInfo()).ToList(),
                Request = Request != null ? Request.ToMaskRequest() : null,
                RequestId = Guid.Parse(RequestId)
            };
        }
    }

    public class DonatorModel : PersonContactModel
    {
        [Required]
        public string BestContactType { get; set; }

        public Donator ToDonator()
        {
            return new Donator
            {
                BestContactType = EnumUtils.GetValue<ContactType>(BestContactType),
                Name = Name,
                Company = Company,
                Email = Email,
                Phone = Phone.RemoveNonDigits()
            };
        }
    }
}
