const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pdf_documents: {
      type: [String],
      required: true,
    },

    // form 1
    about_document: {
      type: Object,
      usa_bankruptcy_court: {
        type: String,
        required: false,
      },
      district_of: {
        type: String,
        required: false,
      },
      division: {
        type: String,
        required: false,
      },
      debtor_name: {
        type: String,
        required: true,
      },
      joint_debtor_name: {
        type: String,
        required: true,
      },
      if_applicable: {
        type: String,
        required: false,
      },
    },

    // form 2
    print_documents: {
      type: String,
      required: false,
    },

    // form 3
    pdf_documents: {
      type: Object,
      document_1: {
        type: Object,
        describe_document: {
          type: String,
          required: true,
        },
        attach: {
          type: String,
          required: true,
        },
        ecf_docket_reference_number: {
          type: String,
          required: true,
        },
        required: true,
      },
      document_2: {
        type: Object,
        describe_document: {
          type: String,
          required: true,
        },
        attach: {
          type: String,
          required: true,
        },
        ecf_docket_reference_number: {
          type: String,
          required: true,
        },
        required: true,
      },
      document_3: {
        type: Object,
        describe_document: {
          type: String,
          required: false,
        },
        attach: {
          type: String,
          required: false,
        },
        ecf_docket_reference_number: {
          type: String,
          required: false,
        },
        required: false,
      },
      document_4: {
        type: Object,
        describe_document: {
          type: String,
          required: false,
        },
        attach: {
          type: String,
          required: false,
        },
        ecf_docket_reference_number: {
          type: String,
          required: false,
        },
        required: false,
      },
      document_5: {
        type: Object,
        describe_document: {
          type: String,
          required: false,
        },
        attach: {
          type: String,
          required: false,
        },
        ecf_docket_reference_number: {
          type: String,
          required: false,
        },
        required: false,
      },
      document_6: {
        type: Object,
        describe_document: {
          type: String,
          required: false,
        },
        attach: {
          type: String,
          required: false,
        },
        ecf_docket_reference_number: {
          type: String,
          required: false,
        },
        required: false,
      },
      ballot: {
        type: Object,
        describe: {
          type: String,
          required: false,
        },
        attach: {
          type: String,
          required: false,
        },
        required: false,
      },
      proof_of_claim: {
        type: Object,
        describe: {
          type: String,
          required: false,
        },
        attach: {
          type: String,
          required: false,
        },
        required: false,
      },
    },

    // form 4
    signature_block_for_certificate: {
      type: Object,
      attorney_ecf_signature: {
        type: Object,
        attorney_name: {
          type: String,
          required: true,
        },
        bar_number: {
          type: String,
          required: false,
        },
        optional_info: {
          type: String,
          required: false,
        },
        firm_name: {
          type: String,
          required: false,
        },
        address: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: false,
        },
        zip: {
          type: String,
          required: false,
        },
        fax: {
          type: String,
          required: false,
        },
        phone_number: {
          type: String,
          required: true,
        },
      },
      email_contact_information: {
        type: Object,
        email: {
          type: String,
          required: true,
        },
        additional_email_1: {
          type: String,
          required: false,
        },
        additional_email_2: {
          type: String,
          required: false,
        },
      },
    },

    // form 5
    return_address: {
      type: Object,
      return_address_name: {
        type: String,
        required: true,
      },
      firm_name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: false,
      },
      zip: {
        type: String,
        required: true,
      },
    },

    // form 6
    pacer_master_mailing_matrix: {
      type: Object,
      download_ecf: {
        type: Boolean,
        required: false,
      },
      exclude: {
        type: String,
        required: true,
      },
      exclude_the_parties_listed_below: {
        type: Object,
        exclude_name_1: {
          type: String,
          required: false,
        },
        exclude_name_2: {
          type: String,
          required: false,
        },
        exclude_name_3: {
          type: String,
          required: false,
        },
        exclude_name_4: {
          type: String,
          required: false,
        },
        required: false,
      },
    },

    // form 7
    user_supplied_address_list: {
      type: Object,
      mailing_list_attaching: {
        type: Boolean,
        required: false,
      },
      own_mailing_list_file: {
        type: String,
        required: false,
      },
    },

    // form 8
    manual_entry_of_additional_addresses: {
      type: Object,
      address_providing: {
        type: Boolean,
        required: false,
      },
      additional_address_1: {
        name: {
          type: String,
          required: false,
        },
        address: {
          type: String,
          required: false,
        },
        address_cont: {
          type: String,
          required: false,
        },
        city: {
          type: String,
          required: false,
        },
        state: {
          type: String,
          required: false,
        },
        zip: {
          type: String,
          required: false,
        },
        country: {
          type: String,
          required: false,
        },
        delivery_option: {
          type: String,
          required: true,
        },
      },
    },

    // form 9

    envelope_in_your_mailing: {
      type: Object,
      information_provide: {
        type: Boolean,
        required: false,
      },
      add_postage: {
        type: String,
        required: false,
      },
      return_envelope: {
        type: Object,
        from_1: {
          type: String,
          required: false,
        },
        from_2: {
          type: String,
          required: false,
        },
        from_3: {
          type: String,
          required: false,
        },
        from_4: {
          type: String,
          required: false,
        },
        name: {
          type: String,
          required: false,
        },
        office: {
          type: String,
          required: false,
        },
        address: {
          type: String,
          required: false,
        },
        city: {
          type: String,
          required: false,
        },
        state: {
          type: String,
          required: false,
        },
        zip: {
          type: String,
          required: false,
        },
        required: false,
      },
    },

    // form 10
    service_level: {
      type: String,
      required: true,
    },

    // form 11
    special_work_requests: {
      type: Object,
      custom_work_request: {
        type: String,
        required: true,
      },
      phone_number: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      ok_to_text: {
        type: Boolean,
        required: false,
      },
    },
    agree_user_agreement: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
