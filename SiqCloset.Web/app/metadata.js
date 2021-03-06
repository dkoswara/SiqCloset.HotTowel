window.app = window.app || {}; window.app.metadata = JSON.stringify({
  "schema": {
    "namespace": "SiqCloset.DataAccess",
    "alias": "Self",
    "annotation:UseStrongSpatialTypes": "false",
    "xmlns:annotation": "http://schemas.microsoft.com/ado/2009/02/edm/annotation",
    "xmlns": "http://schemas.microsoft.com/ado/2009/11/edm",
    "cSpaceOSpaceMapping": "[[\"SiqCloset.DataAccess.Batch\",\"SiqCloset.Model.Batch\"],[\"SiqCloset.DataAccess.Box\",\"SiqCloset.Model.Box\"],[\"SiqCloset.DataAccess.Item\",\"SiqCloset.Model.Item\"],[\"SiqCloset.DataAccess.Customer\",\"SiqCloset.Model.Customer\"]]",
    "entityType": [
      {
        "name": "Batch",
        "key": {
          "propertyRef": {
            "name": "BatchID"
          }
        },
        "property": [
          {
            "name": "BatchID",
            "type": "Edm.Int32",
            "nullable": "false",
            "annotation:StoreGeneratedPattern": "None"
          },
          {
            "name": "DateShipped",
            "type": "Edm.DateTime"
          }
        ],
        "navigationProperty": [
          {
            "name": "Boxes",
            "relationship": "Self.Box_Batch",
            "fromRole": "Box_Batch_Target",
            "toRole": "Box_Batch_Source"
          },
          {
            "name": "Items",
            "relationship": "Self.Item_Batch",
            "fromRole": "Item_Batch_Target",
            "toRole": "Item_Batch_Source"
          }
        ]
      },
      {
        "name": "Box",
        "key": {
          "propertyRef": {
            "name": "BoxID"
          }
        },
        "property": [
          {
            "name": "BoxID",
            "type": "Edm.Guid",
            "nullable": "false"
          },
          {
            "name": "TrackingNo",
            "type": "Edm.String",
            "maxLength": "Max",
            "fixedLength": "false",
            "unicode": "true"
          },
          {
            "name": "BoxNo",
            "type": "Edm.Int32",
            "displayName": "Box No"
          },
          {
            "name": "Weight",
            "type": "Edm.Decimal",
            "precision": "18",
            "scale": "2",
            "nullable": "false"
          },
          {
            "name": "LatestEstDeliveryDate",
            "type": "Edm.DateTime"
          },
          {
            "name": "BatchID",
            "type": "Edm.Int32"
          }
        ],
        "navigationProperty": [
          {
            "name": "Batch",
            "relationship": "Self.Box_Batch",
            "fromRole": "Box_Batch_Source",
            "toRole": "Box_Batch_Target"
          },
          {
            "name": "Items",
            "relationship": "Self.Item_Box",
            "fromRole": "Item_Box_Target",
            "toRole": "Item_Box_Source"
          }
        ]
      },
      {
        "name": "Item",
        "key": {
          "propertyRef": {
            "name": "ItemID"
          }
        },
        "property": [
          {
            "name": "ItemID",
            "type": "Edm.Guid",
            "nullable": "false"
          },
          {
            "name": "Code",
            "type": "Edm.String",
            "maxLength": "Max",
            "fixedLength": "false",
            "unicode": "true",
            "displayName": "Item Code"
          },
          {
            "name": "Name",
            "type": "Edm.String",
            "maxLength": "Max",
            "fixedLength": "false",
            "unicode": "true",
            "displayName": "Item Name"
          },
          {
            "name": "Size",
            "type": "Edm.Int32"
          },
          {
            "name": "Type",
            "type": "Edm.String",
            "maxLength": "Max",
            "fixedLength": "false",
            "unicode": "true"
          },
          {
            "name": "Price",
            "type": "Edm.Decimal",
            "precision": "18",
            "scale": "2",
            "nullable": "false"
          },
          {
            "name": "ShipVia",
            "type": "Edm.String",
            "maxLength": "Max",
            "fixedLength": "false",
            "unicode": "true"
          },
          {
            "name": "Notes",
            "type": "Edm.String",
            "maxLength": "Max",
            "fixedLength": "false",
            "unicode": "true"
          },
          {
            "name": "CustomerID",
            "type": "Edm.Guid"
          },
          {
            "name": "BoxID",
            "type": "Edm.Guid"
          },
          {
            "name": "BatchID",
            "type": "Edm.Int32"
          }
        ],
        "navigationProperty": [
          {
            "name": "Batch",
            "relationship": "Self.Item_Batch",
            "fromRole": "Item_Batch_Source",
            "toRole": "Item_Batch_Target"
          },
          {
            "name": "Box",
            "relationship": "Self.Item_Box",
            "fromRole": "Item_Box_Source",
            "toRole": "Item_Box_Target"
          },
          {
            "name": "Customer",
            "relationship": "Self.Customer_Items",
            "fromRole": "Customer_Items_Target",
            "toRole": "Customer_Items_Source"
          }
        ]
      },
      {
        "name": "Customer",
        "key": {
          "propertyRef": {
            "name": "CustomerID"
          }
        },
        "property": [
          {
            "name": "CustomerID",
            "type": "Edm.Guid",
            "nullable": "false"
          },
          {
            "name": "Name",
            "type": "Edm.String",
            "maxLength": "Max",
            "fixedLength": "false",
            "unicode": "true",
            "nullable": "false",
            "displayName": "Customer Name"
          },
          {
            "name": "Address",
            "type": "Edm.String",
            "maxLength": "Max",
            "fixedLength": "false",
            "unicode": "true"
          },
          {
            "name": "PhoneNo",
            "type": "Edm.String",
            "maxLength": "Max",
            "fixedLength": "false",
            "unicode": "true",
            "displayName": "Phone No"
          }
        ],
        "navigationProperty": {
          "name": "Items",
          "relationship": "Self.Customer_Items",
          "fromRole": "Customer_Items_Source",
          "toRole": "Customer_Items_Target"
        }
      }
    ],
    "association": [
      {
        "name": "Box_Batch",
        "end": [
          {
            "role": "Box_Batch_Source",
            "type": "Edm.Self.Box",
            "multiplicity": "*"
          },
          {
            "role": "Box_Batch_Target",
            "type": "Edm.Self.Batch",
            "multiplicity": "0..1"
          }
        ],
        "referentialConstraint": {
          "principal": {
            "role": "Box_Batch_Target",
            "propertyRef": {
              "name": "BatchID"
            }
          },
          "dependent": {
            "role": "Box_Batch_Source",
            "propertyRef": {
              "name": "BatchID"
            }
          }
        }
      },
      {
        "name": "Item_Batch",
        "end": [
          {
            "role": "Item_Batch_Source",
            "type": "Edm.Self.Item",
            "multiplicity": "*"
          },
          {
            "role": "Item_Batch_Target",
            "type": "Edm.Self.Batch",
            "multiplicity": "0..1"
          }
        ],
        "referentialConstraint": {
          "principal": {
            "role": "Item_Batch_Target",
            "propertyRef": {
              "name": "BatchID"
            }
          },
          "dependent": {
            "role": "Item_Batch_Source",
            "propertyRef": {
              "name": "BatchID"
            }
          }
        }
      },
      {
        "name": "Item_Box",
        "end": [
          {
            "role": "Item_Box_Source",
            "type": "Edm.Self.Item",
            "multiplicity": "*"
          },
          {
            "role": "Item_Box_Target",
            "type": "Edm.Self.Box",
            "multiplicity": "0..1"
          }
        ],
        "referentialConstraint": {
          "principal": {
            "role": "Item_Box_Target",
            "propertyRef": {
              "name": "BoxID"
            }
          },
          "dependent": {
            "role": "Item_Box_Source",
            "propertyRef": {
              "name": "BoxID"
            }
          }
        }
      },
      {
        "name": "Customer_Items",
        "end": [
          {
            "role": "Customer_Items_Source",
            "type": "Edm.Self.Customer",
            "multiplicity": "0..1"
          },
          {
            "role": "Customer_Items_Target",
            "type": "Edm.Self.Item",
            "multiplicity": "*"
          }
        ],
        "referentialConstraint": {
          "principal": {
            "role": "Customer_Items_Source",
            "propertyRef": {
              "name": "CustomerID"
            }
          },
          "dependent": {
            "role": "Customer_Items_Target",
            "propertyRef": {
              "name": "CustomerID"
            }
          }
        }
      }
    ],
    "entityContainer": {
      "name": "SiqClosetDbContext",
      "entitySet": [
        {
          "name": "Batches",
          "entityType": "Self.Batch"
        },
        {
          "name": "Boxes",
          "entityType": "Self.Box"
        },
        {
          "name": "Items",
          "entityType": "Self.Item"
        },
        {
          "name": "Customers",
          "entityType": "Self.Customer"
        }
      ],
      "associationSet": [
        {
          "name": "Box_Batch",
          "association": "Self.Box_Batch",
          "end": [
            {
              "role": "Box_Batch_Source",
              "entitySet": "Boxes"
            },
            {
              "role": "Box_Batch_Target",
              "entitySet": "Batches"
            }
          ]
        },
        {
          "name": "Item_Batch",
          "association": "Self.Item_Batch",
          "end": [
            {
              "role": "Item_Batch_Source",
              "entitySet": "Items"
            },
            {
              "role": "Item_Batch_Target",
              "entitySet": "Batches"
            }
          ]
        },
        {
          "name": "Item_Box",
          "association": "Self.Item_Box",
          "end": [
            {
              "role": "Item_Box_Source",
              "entitySet": "Items"
            },
            {
              "role": "Item_Box_Target",
              "entitySet": "Boxes"
            }
          ]
        },
        {
          "name": "Customer_Items",
          "association": "Self.Customer_Items",
          "end": [
            {
              "role": "Customer_Items_Source",
              "entitySet": "Customers"
            },
            {
              "role": "Customer_Items_Target",
              "entitySet": "Items"
            }
          ]
        }
      ]
    }
  }
});
