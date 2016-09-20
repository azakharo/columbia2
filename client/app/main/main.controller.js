'use strict';

angular.module('columbia2App')
  .controller('MainCtrl', function ($scope, $http, $uibModal, socket, uiGridConstants,
                                    uiGridExporterService, uiGridExporterConstants,
                                    localStorageService, Modal) {

    $scope.$on('$destroy', function () {
      saveGridState();
    });

    //---------------------------------------------------------------
    // ui-grid setup

    $scope.gridOptions = {};

    $scope.gridOptions.columnDefs = [
      {
        displayName: 'Id',
        field: 'ID',
        enableCellEdit: false
      },
      {
        displayName: 'Владелец',
        field: 'owner'
      },
      {
        displayName: 'Дата рождения',
        field: 'birthday',
        type: 'date',
        cellFilter: 'date: "dd.MM.yyyy"',
        enableCellEdit: false
      },
      {
        displayName: 'Пол',
        field: 'sex',
        editableCellTemplate: 'ui-grid/dropdownEditor',
        editDropdownOptionsArray: _.map(SEX, (s) => { return {id: s, value: s}; })
      },
      {
        displayName: 'Порода',
        field: 'poroda',
        enableCellEdit: false
      },
      {
        displayName: 'Дата чипирования',
        field: 'chipDate',
        type: 'date',
        cellFilter: 'date: "dd.MM.yyyy"',
        visible: false,
        enableCellEdit: false
      },
      {
        displayName: 'Расположение чипа',
        field: 'chipLocation',
        visible: false,
        enableCellEdit: false
      },
      {
        displayName: 'Окрас',
        field: 'hair',
        visible: false,
        enableCellEdit: false
      },
      {
        displayName: 'Заметки',
        field: 'specialCharacteristics',
        visible: false
      },
      {
        displayName: 'Группы',
        field: 'groups',
        cellFilter: 'GroupsFilter',
        enableCellEdit: false
      },
      {
        displayName: 'Репродуктивность',
        field: 'reproduction',
        enableCellEdit: false
      }
    ];

    $scope.gridOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
    $scope.gridOptions.enableVerticalScrollbar = uiGridConstants.scrollbars.WHEN_NEEDED;
    // Selection
    $scope.gridOptions.enableRowSelection = true;
    $scope.gridOptions.enableRowHeaderSelection = false;
    $scope.gridOptions.multiSelect = false;
    $scope.gridOptions.modifierKeysToMultiSelect = false;
    $scope.gridOptions.noUnselect = true;
    $scope.gridOptions.onRegisterApi = function(gridApi) {
      $scope.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope, onSelectionChanged);

      // Save grid state on column position changed
      gridApi.colMovable.on.columnPositionChanged($scope, function(colDef, originalPosition, newPosition) {
        saveGridState();
      });

      // Save grid state on column visibility changed
      gridApi.core.on.columnVisibilityChanged($scope, function (column) {
        saveGridState();
      });

      // Save grid state on column resize
      gridApi.colResizable.on.columnSizeChanged($scope, function(colDef, deltaChange) {
        saveGridState();
      });

      // Single filtering
      $scope.gridApi.grid.registerRowsProcessor($scope.singleFilter, 200);

      // Save after cell edit
      gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
        // TODO rem code dupl
        $http.put('/api/things/' + $scope.selectedCow._id, $scope.selectedCow);
      });
    };
    $scope.selectedCow = null;
    function onSelectionChanged(row){
      if (row.isSelected) {
        $scope.selectedCow = row.entity;
      }
      else {
        $scope.selectedCow = null;
      }
    }

    ///////////////////////////////////////////////////////////////////////////////////
    // Double-click handling

    //$scope.gridOptions.rowTemplate = `<div
    //ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid"
    //ui-grid-one-bind-id-grid="rowRenderIndex + '-' + col.uid + '-cell'"
    //class="ui-grid-cell"
    //ng-class="{ 'ui-grid-row-header-cell': col.isRowHeader }"
    //role="{{col.isRowHeader ? 'rowheader' : 'gridcell'}}"
    //ng-dblclick="grid.appScope.onDblClick(row.entity)"
    //ui-grid-cell>
    //</div>`;
    //
    //$scope.onDblClick = function (cow) {
    //  $scope.onEditBtnClick();
    //};

    // Double-click handling
    ///////////////////////////////////////////////////////////////////////////////////


    //===============================================================
    // Single filter (search)

    $scope.gridOptions.enableFiltering = false;

    $scope.onSearchBtnClick = function() {
      $scope.gridApi.grid.refresh();
    };

    $scope.singleFilter = function (renderableRows) {
      if (!$scope.filterStr) {
        return renderableRows;
      }

      let matcher = new RegExp($scope.filterStr);
      let visibleCols = _.filter($scope.gridOptions.columnDefs, function (colDef) {
        return colDef.visible === undefined || colDef.visible;
      });

      renderableRows.forEach(function (row) {
        var match = false;

        _.forEach(visibleCols, function (colDef) {
          let colVal;
          if (colDef.field === 'birthday' || colDef.field === 'chipDate') {
            colVal = moment(row.entity[colDef.field]).format('DD.MM.YYYY');
          }
          else if (colDef.field === 'groups') {
            colVal = row.entity[colDef.field].join(', ');
          }
          else {
            colVal = row.entity[colDef.field];
          }

          if (colVal && colVal.match(matcher)) {
            match = true;
            return  false;
          }
        });

        if (!match) {
          row.visible = false;
        }
      });
      return renderableRows;
    };

    // Single filter (search)
    //===============================================================


    ///////////////////////////////////////////////////////
    // Grid state save / restore

    const gridStateStorageKey = 'animalGridState';

    function saveGridState() {
      const gridState = $scope.gridApi.saveState.save();
      localStorageService.set(gridStateStorageKey, gridState);
      //log("grid state saved");
    }

    function restoreGridState() {
      let gridState = localStorageService.get(gridStateStorageKey);
      if (gridState) {
        $scope.gridApi.saveState.restore($scope, gridState);
        //log("grid state restored");
      }
    }

    // Grid state save / restore
    ///////////////////////////////////////////////////////

    // pagination
    $scope.gridOptions.paginationPageSizes = [25, 50, 75, 100];
    $scope.gridOptions.paginationPageSize = 25;

    // grid menu
    $scope.gridOptions.enableGridMenu = true;

    // Disable CSV, PDF exporting
    $scope.gridOptions.exporterMenuPdf = false;
    $scope.gridOptions.exporterMenuCsv = false;

    //*****************************************************
    // Export to XLS

    $scope.exportXLSX = function() {
      var data = [
        [] // header row
      ];

      var rows = uiGridExporterService.getData($scope.gridApi.grid, uiGridExporterConstants.VISIBLE, uiGridExporterConstants.VISIBLE);

      var sheet = {};

      $scope.gridApi.grid.columns.forEach(function (col, i) {
        if (col.visible) {
          var loc = XLSX.utils.encode_cell({r: 0, c: i});

          sheet[loc] = {
            v: col.displayName
          };
        }
      });

      var endLoc;
      rows.forEach(function (row, ri) {
        ri +=1;

        $scope.gridApi.grid.columns.forEach(function (col, ci) {
          if(row[ci]) {
            var loc = XLSX.utils.encode_cell({r: ri, c: ci});

            var val = row[ci].value;
            if (val instanceof Date) {
              val = moment(val).format('DD.MM.YYYY');
            }

            sheet[loc] = {
              v: val,
              t: 's'
            };

            endLoc = loc;
          }
        });
      });

      sheet['!ref'] = XLSX.utils.encode_range({ s: 'A1', e: endLoc });

      var workbook = {
        SheetNames: ['Sheet1'],
        Sheets: {
          Sheet1: sheet
        }
      };

      var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
      var wbout = XLSX.write(workbook, wopts);

      saveAs(new Blob([s2ab(wbout)], {type: ""}), "test.xlsx");
    };

    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }

    // Export to XLS
    //*****************************************************

    // ui-grid setup
    //---------------------------------------------------------------


    //////////////////////////////////////////////////////////////////////
    // Operations with cows on server

    $scope.isLoading = true;
    $http.get('/api/things').success(function (awesomeThings) {
      $scope.gridOptions.data = awesomeThings;
      socket.syncUpdates('thing', $scope.gridOptions.data);
      restoreGridState();
    }).finally(function () {
      $scope.isLoading = false;
    });

    function createDefaultAnimal() {
      return {
        ID: '',
        owner: 'Anton Subbotin',
        birthday: moment().toDate(),
        sex: SEX[0],
        poroda: PORODY[0],
        motherID: '',
        chipDate: moment().toDate(),
        chipLocation: CHIP_LOCATIONS[0],
        hair: HAIRS[0],
        specialCharacteristics: '',
        reproduction: REPRODUCTION_CHOICES[0],
        groups: []
      }
    }

    $scope.onAddBtnClick = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/main/animalInfoDlg.html',
        controller: 'animalInfoDlgCtrl',
        size: 'lg',
        resolve: {
          animal: function () {
            return createDefaultAnimal();
          },
          operation: function () {
            return 'создание';
          }
        },
        windowClass: 'modal-success'
      });

      modalInstance.result.then(function (cow) {
        $http.post('/api/things', cow);
      });
    };

    $scope.onDelBtnClick = function (cow) {
      if (cow) {
        let openConfirmFunc = Modal.confirm.delete(
          function () {
            $http.delete('/api/things/' + cow._id);
            $scope.selectedCow = null;
          }
        );
        openConfirmFunc(`животное с id ${cow.ID}`);
      }
    };

    $scope.onEditBtnClick = function () {
      //if ($scope.selectedCow.sex === 'М') {
      //  var modalInstance = $uibModal.open({
      //    templateUrl: 'app/main/formlyDlg.html',
      //    controller: 'formlyDlgCtrl',
      //    size: 'lg',
      //    resolve: {
      //      animal: function () {
      //        return $scope.selectedCow;
      //      },
      //      operation: function () {
      //        return 'редактирование';
      //      }
      //    },
      //    windowClass: 'modal-primary'
      //  });
      //
      //  modalInstance.result.then(function (cow) {
      //    //log($scope.selectedCow);
      //    //log(cow);
      //    $http.put('/api/things/' + $scope.selectedCow._id, cow);
      //  });
      //}
      //else {
        var modalInstance = $uibModal.open({
          templateUrl: 'app/main/animalInfoDlg.html',
          controller: 'animalInfoDlgCtrl',
          size: 'lg',
          resolve: {
            animal: function () {
              return $scope.selectedCow;
            },
            operation: function () {
              return 'редактирование';
            }
          },
          windowClass: 'modal-primary'
        });

        modalInstance.result.then(function (cow) {
          //log($scope.selectedCow);
          //log(cow);
          $http.put('/api/things/' + $scope.selectedCow._id, cow);
        });
      //}
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    // Operations with cows on server
    //////////////////////////////////////////////////////////////////////

  })

  .filter('GroupsFilter', function () {
    return function (groups) {
      return groups.join(', ');
    };
  });

