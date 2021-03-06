﻿(function () {
    'use strict';

    var serviceId = 'model';

    angular.module('app').factory(serviceId, model);

    function model() {
        // Define the functions and properties to reveal.

        var modelInfo = {
            Customer: {
                entityName: 'Customer',
                resourceName: 'Customers',
            },
            Item: {
                entityName: 'Item',
                resourceName: 'Items',
            },
            Box: {
                entityName: 'Box',
                resourceName: 'Boxes',
            },
            Batch: {
                entityName: 'Batch',
                resourceName: 'Batches',
            }
        };
        
        var service = {
            configureMetadataStore: configureMetadataStore,
            modelInfo: modelInfo,
            createNullos: createNullos,
        };

        return service;

        function configureMetadataStore(metadataStore) {
            extendItemEntityType(metadataStore);
            //registerItem(metadataStore);
            
        }
        
        function Customer() {
            this.isPartial = false;
            //this.id = null;
        }

        function registerItem(metadataStore) {
            metadataStore.registerEntityTypeCtor(modelInfo.Item.entityName, Item);

            function Item() {
                //this.custName = '';
            }

        }

        function extendItemEntityType(metadataStore) {
            var itemType = metadataStore.getEntityType('Item');
            var custIdProp = itemType.getDataProperty('customerID');
            custIdProp.custom = {
                navPropDesc: 'name',
            };

            var boxIdProp = itemType.getDataProperty('boxID');
            boxIdProp.custom = {
                navPropDesc: 'boxNo',
            };
        }

        function createNullos(manager) {
            var unchanged = breeze.EntityState.Unchanged;
            return createNullo(modelInfo.Customer.entityName);

            function createNullo(entityName, values) {
                var initialValues = values || { name: '[Select a ' + entityName.toLowerCase() + ']' };
                return manager.createEntity(entityName, initialValues, unchanged);
            }
        }
    }
})();