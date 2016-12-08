import isBoolean from 'd2-utilizr/lib/isBoolean';
import isNumber from 'd2-utilizr/lib/isNumber';
import isObject from 'd2-utilizr/lib/isObject';
import isString from 'd2-utilizr/lib/isString';

export var AggregateOptionsWindow;

AggregateOptionsWindow = function(c) {
    var t = this,

        appManager = c.appManager,
        uiManager = c.uiManager,
        instanceManager = c.instanceManager,
        i18n = c.i18nManager.get(),
        optionConfig = c.optionConfig;

    var comboboxWidth = 280,
        comboBottomMargin = 1,
        checkboxBottomMargin = 2,
        separatorTopMargin = 10,
        window;

    var showColTotals = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.show_col_totals,
        style: 'margin-bottom:' + checkboxBottomMargin + 'px',
        checked: true
    });

    var showColSubTotals = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.show_col_subtotals,
        style: 'margin-bottom:' + checkboxBottomMargin + 'px',
        checked: true
    });

    var showRowTotals = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.show_row_totals,
        style: 'margin-top:' + separatorTopMargin + 'px; margin-bottom:' + checkboxBottomMargin + 'px',
        checked: true
    });

    var showRowSubTotals = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.show_row_subtotals,
        style: 'margin-bottom:' + checkboxBottomMargin + 'px',
        checked: true
    });

    var showDimensionLabels = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.show_dimension_labels,
        style: 'margin-top:' + separatorTopMargin + 'px; margin-bottom:' + checkboxBottomMargin + 'px',
        checked: true
    });

    var hideEmptyRows = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.hide_empty_rows,
        style: 'margin-top:' + separatorTopMargin + 'px; margin-bottom:' + checkboxBottomMargin + 'px',
    });

    var hideNaData = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.hide_na_data,
        style: 'margin-bottom:' + checkboxBottomMargin + 'px',
    });

    var completedOnly = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.include_only_completed_events_only,
        style: 'margin-bottom:' + checkboxBottomMargin + 'px',
    });

    var limit = Ext.create('Ext.ux.container.LimitContainer', {
        boxLabel: i18n.limit,
        sortOrder: 1,
        topLimit: 10,
        comboboxWidth: comboboxWidth,
        comboBottomMargin: comboBottomMargin,
        style: 'margin-top:' + separatorTopMargin + 'px'
    });

    var outputType = Ext.create('Ext.form.field.ComboBox', {
        cls: 'ns-combo',
        style: 'margin-bottom:' + comboBottomMargin + 'px',
        width: comboboxWidth,
        labelWidth: 130,
        fieldLabel: i18n.output_type,
        labelStyle: 'color:#333',
        queryMode: 'local',
        valueField: 'id',
        editable: false,
        value: 'EVENT',
        store: Ext.create('Ext.data.Store', {
            fields: ['id', 'text'],
            data: [
                {id: 'EVENT', text: i18n.event},
                {id: 'ENROLLMENT', text: i18n.enrollment},
                {id: 'TRACKED_ENTITY_INSTANCE', text: i18n.tracked_entity_instance}
            ]
        })
    });

    var showHierarchy = Ext.create('Ext.form.field.Checkbox', {
        boxLabel: i18n.show_hierarchy,
        style: 'margin-bottom:' + checkboxBottomMargin + 'px',
    });

    var displayDensity = Ext.create('Ext.form.field.ComboBox', {
        cls: 'ns-combo',
        style: 'margin-bottom:' + comboBottomMargin + 'px',
        width: comboboxWidth,
        labelWidth: 130,
        fieldLabel: i18n.display_density,
        labelStyle: 'color:#333',
        queryMode: 'local',
        valueField: 'id',
        editable: false,
        value: optionConfig.getDisplayDensity('normal').id,
        store: Ext.create('Ext.data.Store', {
            fields: ['id', 'text'],
            data: optionConfig.getDisplayDensityRecords()
        })
    });

    var fontSize = Ext.create('Ext.form.field.ComboBox', {
        cls: 'ns-combo',
        style: 'margin-bottom:' + comboBottomMargin + 'px',
        width: comboboxWidth,
        labelWidth: 130,
        fieldLabel: i18n.font_size,
        labelStyle: 'color:#333',
        queryMode: 'local',
        valueField: 'id',
        editable: false,
        value: optionConfig.getFontSize('normal').id,
        store: Ext.create('Ext.data.Store', {
            fields: ['id', 'text'],
            data: optionConfig.getFontSizeRecords()
        })
    });

    var digitGroupSeparator = Ext.create('Ext.form.field.ComboBox', {
        labelStyle: 'color:#333',
        cls: 'ns-combo',
        style: 'margin-bottom:0',
        width: comboboxWidth,
        labelWidth: 130,
        fieldLabel: i18n.digit_group_separator,
        queryMode: 'local',
        valueField: 'id',
        editable: false,
        value: optionConfig.getDigitGroupSeparator('space').id,
        store: Ext.create('Ext.data.Store', {
            fields: ['id', 'text'],
            data: optionConfig.getDigitGroupSeparatorRecords()
        })
    });

    var data = {
        bodyStyle: 'border:0 none',
        style: 'margin-left:14px',
        items: [
            showColTotals,
            showColSubTotals,
            showRowTotals,
            showRowSubTotals,
            showDimensionLabels,
            hideEmptyRows,
            hideNaData,
            completedOnly,
            limit,
            outputType
            //aggregationType
        ]
    };

    var organisationUnits = {
        bodyStyle: 'border:0 none',
        style: 'margin-left:14px',
        items: [
            showHierarchy
        ]
    };

    var style = {
        bodyStyle: 'border:0 none',
        style: 'margin-left:14px',
        items: [
            displayDensity,
            fontSize,
            digitGroupSeparator
            //legendSet
        ]
    };

    var window = Ext.create('Ext.window.Window', {
        title: i18n.table_options,
        bodyStyle: 'background-color:#fff; padding:2px',
        closeAction: 'hide',
        autoShow: true,
        modal: true,
        resizable: false,
        hideOnBlur: true,
        getOptions: function() {
            return {
                showRowTotals: showRowTotals.getValue(),
                showColTotals: showColTotals.getValue(),
                showColSubTotals: showColSubTotals.getValue(),
                showRowSubTotals: showRowSubTotals.getValue(),
                showDimensionLabels: showDimensionLabels.getValue(),
                hideEmptyRows: hideEmptyRows.getValue(),
                hideNaData: hideNaData.getValue(),
                completedOnly: completedOnly.getValue(),
                outputType: outputType.getValue(),
                sortOrder: limit.getSortOrder(),
                topLimit: limit.getTopLimit(),
                showHierarchy: showHierarchy.getValue(),
                showDimensionLabels: showDimensionLabels.getValue(),
                displayDensity: displayDensity.getValue(),
                fontSize: fontSize.getValue(),
                digitGroupSeparator: digitGroupSeparator.getValue()
                //legendSet: {id: legendSet.getValue()}
            };
        },
        setOptions: function(layout) {
            showRowTotals.setValue(isBoolean(layout.showRowTotals) ? layout.showRowTotals : true);
            showColTotals.setValue(isBoolean(layout.showColTotals) ? layout.showColTotals : true);
            showColSubTotals.setValue(isBoolean(layout.showColSubTotals) ? layout.showColSubTotals : true);
            showRowSubTotals.setValue(isBoolean(layout.showRowSubTotals) ? layout.showRowSubTotals : true);
            showDimensionLabels.setValue(isBoolean(layout.showDimensionLabels) ? layout.showDimensionLabels : true);
            hideEmptyRows.setValue(isBoolean(layout.hideEmptyRows) ? layout.hideEmptyRows : false);
            hideNaData.setValue(isBoolean(layout.hideNaData) ? layout.hideNaData : false);
            completedOnly.setValue(isBoolean(layout.completedOnly) ? layout.completedOnly : false);
            outputType.setValue(isString(layout.outputType) ? layout.outputType : 'EVENT');
            limit.setValues(layout.sortOrder, layout.topLimit);
            //aggregationType.setValue(isString(layout.aggregationType) ? layout.aggregationType : 'default');
            showHierarchy.setValue(isBoolean(layout.showHierarchy) ? layout.showHierarchy : false);
            displayDensity.setValue(isString(layout.displayDensity) ? layout.displayDensity : optionConfig.getDisplayDensity('normal').id);
            fontSize.setValue(isString(layout.fontSize) ? layout.fontSize : optionConfig.getFontSize('normal').id);
            digitGroupSeparator.setValue(isString(layout.digitGroupSeparator) ? layout.digitGroupSeparator : optionConfig.getDigitGroupSeparator('space').id);
            //legendSet.setValue(isObject(layout.legendSet) && isString(layout.legendSet.id) ? layout.legendSet.id : 0);
            //reportingPeriod.setValue(isBoolean(layout.reportingPeriod) ? layout.reportingPeriod : false);
            //organisationUnit.setValue(isBoolean(layout.organisationUnit) ? layout.organisationUnit : false);
            //parentOrganisationUnit.setValue(isBoolean(layout.parentOrganisationUnit) ? layout.parentOrganisationUnit : false);
            //regression.setValue(isBoolean(layout.regression) ? layout.regression : false);
            //cumulative.setValue(isBoolean(layout.cumulative) ? layout.cumulative : false);
            //sortOrder.setValue(isNumber(layout.sortOrder) ? layout.sortOrder : 0);
            //topLimit.setValue(isNumber(layout.topLimit) ? layout.topLimit : 0);
        },
        items: [
            {
                bodyStyle: 'border:0 none; color:#222; font-size:12px; font-weight:bold',
                style: 'margin-top:4px; margin-bottom:6px; margin-left:5px',
                html: i18n.data
            },
            data,
            {
                bodyStyle: 'border:0 none; padding:7px'
            },
            {
                bodyStyle: 'border:0 none; color:#222; font-size:12px; font-weight:bold',
                style: 'margin-bottom:6px; margin-left:5px',
                html: i18n.organisation_units
            },
            organisationUnits,
            {
                bodyStyle: 'border:0 none; padding:7px'
            },
            {
                bodyStyle: 'border:0 none; color:#222; font-size:12px; font-weight:bold',
                style: 'margin-bottom:6px; margin-left:5px',
                html: i18n.style
            },
            style
        ],
        bbar: [
            '->',
            {
                text: i18n.hide,
                handler: function() {
                    window.hide();
                }
            },
            {
                text: '<b>' + i18n.update + '</b>',
                handler: function() {
                    instanceManager.getReport();

                    window.hide();
                }
            }
        ],
        listeners: {
            show: function(w) {
                var optionsButton = uiManager.get('optionsButton') || {};

                if (optionsButton.rendered) {
                    c.uiManager.setAnchorPosition(w, optionsButton);

                    if (!w.hasHideOnBlurHandler) {
                        c.uiManager.addHideOnBlurHandler(w);
                    }
                }

                //if (!legendSet.store.isLoaded) {
                    //legendSet.store.load();
                //}

                // cmp
                w.showColTotals = showColTotals;
                w.showRowTotals = showRowTotals;
                w.showColSubTotals = showColSubTotals
                w.showRowSubTotals = showRowSubTotals;
                w.showDimensionLabels = showDimensionLabels;
                w.hideEmptyRows = hideEmptyRows;
                w.hideNaData = hideNaData;
                w.completedOnly = completedOnly;
                w.limit = limit;
                w.outputType = outputType;
                w.showHierarchy = showHierarchy;
                w.displayDensity = displayDensity;
                w.fontSize = fontSize;
                w.digitGroupSeparator = digitGroupSeparator;
            }
        }
    });

    return window;
};