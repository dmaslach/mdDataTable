angular.module("mdtTemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("/main/templates/generateRows.html","<tr class=\"tbodyTrRow\"\r\n    ng-repeat=\"rowData in mdtPaginationHelper.getRows() track by $index\"\r\n    ng-class=\"{\'selectedRow\': rowData.optionList.selected}\"\r\n    ng-show=\"(isPaginationEnabled() === false || rowData.optionList.visible === true) && rowData.optionList.deleted === false\">\r\n\r\n    <td class=\"checkboxCell\" ng-show=\"selectableRows\">\r\n        <md-checkbox aria-label=\"select\" ng-model=\"rowData.optionList.selected\" ng-change=\"onCheckboxChange()\"></md-checkbox>\r\n    </td>\r\n\r\n    <td class=\"column\"\r\n        ng-repeat=\"cellData in rowData.data track by $index\"\r\n        mdt-add-align-class=\"headerData[$index].alignRule\"\r\n        style=\"position:relative;\">\r\n\r\n            <!-- editable field -->\r\n            <ng-md-icon icon=\"edit\" size=\"16\"\r\n                        style=\"cursor:pointer;float:right;height:16px;padding-left:5px;outline: none;\"\r\n                        ng-if=\"cellData.attributes.editableField\"\r\n                        ng-click=\"showEditDialog($event, cellData, rowData)\"></ng-md-icon>\r\n\r\n            <span mdt-add-html-content-to-cell=\"cellData\"\r\n                  style=\"cursor:pointer;outline: none;\"\r\n                  ng-if=\"cellData.attributes.editableField\"\r\n                  ng-click=\"showEditDialog($event, cellData, rowData)\"></span>\r\n\r\n            <!-- non editable field -->\r\n            <span mdt-add-html-content-to-cell=\"cellData\" ng-if=\"cellData.attributes.editableField == false\"></span>\r\n    </td>\r\n</tr>\r\n<tr ng-show=\"mdtPaginationHelper.isLoading\">\r\n    <td colspan=\"999\">\r\n        <md-progress-linear md-mode=\"indeterminate\"></md-progress-linear>\r\n    </td>\r\n</tr>\r\n<tr ng-show=\"mdtPaginationHelper.isLoadError\">\r\n    <td colspan=\"999\" class=\"errorMessage\">\r\n        <ng-bind-html ng-bind-html=\"mdtPaginationHelper.mdtRowPaginatorErrorMessage\"></ng-bind-html>\r\n    </td>\r\n</tr>\r\n<tr ng-show=\"mdtPaginationHelper.isNoResults && !mdtPaginationHelper.isLoadError\">\r\n    <td colspan=\"999\" class=\"noResultMessage\">\r\n        <ng-bind-html ng-bind-html=\"mdtPaginationHelper.mdtRowPaginatorNoResultsMessage\"></ng-bind-html>\r\n    </td>\r\n</tr>");
$templateCache.put("/main/templates/generateRowsVirtualRepeat.html","<tr md-virtual-repeat=\"rowData in mdtPaginationHelper.getRows()\"\r\n    ng-class=\"{\'selectedRow\': rowData.optionList.selected}\"\r\n    ng-show=\"(isPaginationEnabled() === false || rowData.optionList.visible === true) && rowData.optionList.deleted === false\">\r\n\r\n    <td class=\"checkboxCell\" ng-show=\"selectableRows\">\r\n        <md-checkbox aria-label=\"select\" ng-model=\"rowData.optionList.selected\" ng-change=\"onCheckboxChange()\"></md-checkbox>\r\n    </td>\r\n\r\n    <td\r\n        class=\"column\"\r\n        ng-repeat=\"cellData in rowData.data\"\r\n        mdt-add-align-class=\"headerData[$index].alignRule\">\r\n\r\n        <span mdt-add-html-content-to-cell=\"cellData\"></span>\r\n    </td>\r\n</tr>\r\n<tr ng-show=\"mdtPaginationHelper.isLoading\">\r\n    <td colspan=\"999\">\r\n        <md-progress-linear md-mode=\"indeterminate\"></md-progress-linear>\r\n    </td>\r\n</tr>\r\n<tr ng-show=\"mdtPaginationHelper.isLoadError\">\r\n    <td colspan=\"999\">\r\n        {{mdtPaginationHelper.mdtRowPaginatorErrorMessage}}\r\n    </td>\r\n</tr>");
$templateCache.put("/main/templates/generateTable.html","<table cellpadding=\"0\" cellspacing=\"0\">\r\n    <thead class=\"originalHeader\">\r\n        <tr class=\"theadTrRow\"\r\n            mdt-animate-sort-icon-handler>\r\n\r\n            <!-- TODO: fix text-align:left, in theory it should not be there to make it work -->\r\n            <th class=\"checkboxCell\"\r\n                style=\"text-align:left;\"\r\n                ng-show=\"selectableRows\"\r\n                mdt-select-all-rows-handler>\r\n                <md-checkbox aria-label=\"select all\" ng-model=\"selectAllRows\"></md-checkbox>\r\n            </th>\r\n\r\n            <th class=\"column\"\r\n                ng-repeat=\"headerRowData in headerData track by $index\"\r\n                ng-class=\"{\'clickable\': sortableColumns}\"\r\n                mdt-add-align-class=\"headerRowData.alignRule\"\r\n                mdt-sort-handler\r\n                md-ink-ripple=\"{{rippleEffect}}\">\r\n\r\n                <mdt-generated-header-cell-content></mdt-generated-header-cell-content>\r\n            </th>\r\n        </tr>\r\n    </thead>\r\n    <tbody md-virtual-repeat-container ng-include=\"\'/main/templates/generateRowsVirtualRepeat.html\'\" ng-if=\"virtualRepeat\" style=\"display: table-row-group;\"></tbody>\r\n    <tbody ng-include=\"\'/main/templates/generateRows.html\'\" ng-if=\"!virtualRepeat\"></tbody>\r\n</table>");
$templateCache.put("/main/templates/largeEditDialog.html","<md-dialog style=\"min-width: 300px;\">\r\n    <md-dialog-content style=\"margin-left:16px;margin-right:16px;\" layout-align=\"column\">\r\n        <form ng-submit=\"saveRow()\" name=\"editFieldForm\">\r\n            <h2>{{cellData.attributes.editableFieldTitle}}</h2>\r\n            <md-input-container md-no-float style=\"margin-bottom:0;width:100%\">\r\n\r\n                <!-- TODO getting placeholder -->\r\n                <input type=\"text\"\r\n                       ng-model=\"cellData.value\"\r\n                       placeholder=\"\"\r\n                       md-maxlength=\"{{cellData.attributes.editableFieldMaxLength}}\" />\r\n            </md-input-container>\r\n        </form>\r\n    </md-dialog-content>\r\n\r\n    <md-dialog-actions>\r\n        <md-button class=\"md-primary\" ng-click=\"saveRow()\">{{mdtTranslations.largeEditDialog.saveButtonLabel}}</md-button>\r\n        <md-button class=\"md-primary\" ng-click=\"cancel()\">{{mdtTranslations.largeEditDialog.cancelButtonLabel}}</md-button>\r\n    </md-dialog-actions>\r\n</md-dialog>");
$templateCache.put("/main/templates/mdtAlternateHeaders.html","<div class=\"mdt-header-alternate\" layout=\"row\" layout-align=\"start center\">\r\n    <span class=\"alternate-text\" flex>{{getNumberOfSelectedRows()}} item selected</span>\r\n    <md-button class=\"md-icon-button md-primary\" ng-click=\"deleteSelectedRows()\" aria-label=\"Delete selected rows\">\r\n        <ng-md-icon icon=\"delete\" size=\"24\"></ng-md-icon>\r\n    </md-button>\r\n\r\n    <md-button class=\"md-icon-button md-primary\" aria-label=\"More options\">\r\n        <ng-md-icon icon=\"more_vert\" size=\"24\"></ng-md-icon>\r\n    </md-button>\r\n</div>");
$templateCache.put("/main/templates/mdtCardFooter.html","<div class=\"mdt-footer\" layout=\"row\" ng-show=\"isPaginationEnabled()\">\r\n    <div class=\"mdt-pagination\"\r\n         layout=\"row\"\r\n         layout-align=\"end center\"\r\n         flex>\r\n\r\n        <span layout-margin>{{mdtTranslations.rowsPerPage}}</span>\r\n        <md-input-container>\r\n            <md-select ng-model=\"rowsPerPage\" aria-label=\"rows per page\">\r\n                <md-option ng-value=\"pageSize\" ng-repeat=\"pageSize in mdtPaginationHelper.rowsPerPageValues\">{{pageSize}}</md-option>\r\n            </md-select>\r\n        </md-input-container>\r\n\r\n        <span layout-margin>\r\n            {{mdtPaginationHelper.getStartRowIndex()+1}}-{{mdtPaginationHelper.getEndRowIndex()+1}} of {{mdtPaginationHelper.getTotalRowsCount()}}\r\n        </span>\r\n\r\n        <md-button class=\"md-icon-button md-primary\" ng-class=\"{\'md-inactive\': !mdtPaginationHelper.hasPreviousPage()}\" aria-label=\"Previous page\" ng-click=\"mdtPaginationHelper.previousPage()\">\r\n            <ng-md-icon icon=\"keyboard_arrow_left\" size=\"24\"></ng-md-icon>\r\n        </md-button>\r\n\r\n        <md-button class=\"md-icon-button md-primary\" ng-class=\"{\'md-inactive\': !mdtPaginationHelper.hasNextPage()}\" aria-label=\"Next page\" ng-click=\"mdtPaginationHelper.nextPage()\">\r\n            <ng-md-icon icon=\"keyboard_arrow_right\" size=\"24\"></ng-md-icon>\r\n        </md-button>\r\n    </div>\r\n</div>");
$templateCache.put("/main/templates/mdtCardHeader.html","<div class=\"mdt-header\" layout=\"row\" layout-align=\"start center\" ng-show=\"isTableCardEnabled\">\r\n    <span flex>{{tableCard.title}}</span>\r\n<!--\r\n    <md-button class=\"md-icon-button md-primary\" aria-label=\"Filter\">\r\n        <ng-md-icon icon=\"filter_list\" size=\"24\"></ng-md-icon>\r\n    </md-button>\r\n    <md-button class=\"md-icon-button md-primary\" aria-label=\"More options\">\r\n        <ng-md-icon icon=\"more_vert\" size=\"24\"></ng-md-icon>\r\n    </md-button>\r\n-->\r\n</div>");
$templateCache.put("/main/templates/mdtGeneratedHeaderCellContent.html","<div>\r\n    <div ng-if=\"sortableColumns\">\r\n        <md-tooltip ng-show=\"headerRowData.columnDefinition\">{{headerRowData.columnDefinition}}</md-tooltip>\r\n\r\n        <span ng-show=\"headerRowData.alignRule == \'right\'\">\r\n            <span class=\"hoverSortIcons\" ng-if=\"!isSorted()\">\r\n                <ng-md-icon icon=\"arrow_forward\" size=\"16\"></ng-md-icon>\r\n            </span>\r\n\r\n            <span class=\"sortedColumn\" ng-if=\"isSorted()\" ng-class=\"direction == -1 ? \'ascending\' : \'descending\'\">\r\n                <ng-md-icon icon=\"arrow_forward\" size=\"16\"></ng-md-icon>\r\n            </span>\r\n        </span>\r\n\r\n        <span>\r\n            {{headerRowData.columnName}}\r\n        </span>\r\n\r\n        <span ng-show=\"headerRowData.alignRule == \'left\'\">\r\n            <span class=\"hoverSortIcons\" ng-if=\"!isSorted()\">\r\n                <ng-md-icon icon=\"arrow_forward\" size=\"16\"></ng-md-icon>\r\n            </span>\r\n\r\n            <span class=\"sortedColumn\" ng-if=\"isSorted()\" ng-class=\"direction == -1 ? \'ascending\' : \'descending\'\">\r\n                <ng-md-icon icon=\"arrow_forward\" size=\"16\"></ng-md-icon>\r\n            </span>\r\n        </span>\r\n    </div>\r\n    <div ng-if=\"!sortableColumns\">\r\n        <md-tooltip ng-show=\"headerRowData.columnDefinition\">{{headerRowData.columnDefinition}}</md-tooltip>\r\n\r\n        <span>\r\n            {{headerRowData.columnName}}\r\n        </span>\r\n    </div>\r\n</div>");
$templateCache.put("/main/templates/mdtTable.html","<md-content class=\"mdtTable md-whiteframe-z1\" layout=\"column\" ng-cloak>\r\n    <!-- table card -->\r\n    <mdt-card-header ng-hide=\"alternateHeaders && isAnyRowSelected()\"></mdt-card-header>\r\n\r\n    <!-- alternate headers -->\r\n    <mdt-alternate-headers ng-show=\"alternateHeaders && isAnyRowSelected()\"></mdt-alternate-headers>\r\n    <!-- alternate headers end -->\r\n\r\n    <div id=\"reader\" style=\"display:none;\"></div>\r\n\r\n    <ng-include src=\"\'/main/templates/generateTable.html\'\"></ng-include>\r\n\r\n    <!-- table card -->\r\n    <mdt-card-footer></mdt-card-footer>\r\n    <!-- table card end -->\r\n</md-content>");
$templateCache.put("/main/templates/smallEditDialog.html","<md-dialog aria-label=\"edit field modal\">\r\n    <md-dialog-content style=\"margin-left:16px;margin-right:16px;\">\r\n        <form ng-submit=\"saveRow()\" name=\"editFieldForm\">\r\n            <md-input-container md-no-float style=\"margin-bottom:0;width:100%;\">\r\n\r\n                <!-- TODO getting placeholder -->\r\n                <input type=\"text\"\r\n                       ng-model=\"cellData.value\"\r\n                       placeholder=\"\"\r\n                       md-maxlength=\"{{cellData.attributes.editableFieldMaxLength}}\" />\r\n            </md-input-container>\r\n        </form>\r\n    </md-dialog-content>\r\n</md-dialog>");}]);