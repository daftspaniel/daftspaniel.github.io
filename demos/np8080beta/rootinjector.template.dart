// **************************************************************************
// Generator: Instance of 'Compiler'
// **************************************************************************

// ignore_for_file: cancel_subscriptions,constant_identifier_names,duplicate_import,non_constant_identifier_names,library_prefixes,UNUSED_IMPORT,UNUSED_SHOWN_NAME
import 'rootinjector.dart';
export 'rootinjector.dart';
import 'package:angular/angular.dart';
import 'rootinjector.template.dart' as mainng;
import 'package:np8080/src/services/documentservice.dart';
import 'package:np8080/src/services/eventbusservice.dart';
import 'package:np8080/src/services/textareadomservice.dart';
import 'package:np8080/src/services/textprocessingservice.dart';
import 'package:np8080/src/services/themeservice.dart';
import 'package:angular/angular.template.dart' as _ref0;
import 'package:np8080/src/services/documentservice.template.dart' as _ref1;
import 'package:np8080/src/services/eventbusservice.template.dart' as _ref2;
import 'package:np8080/src/services/textareadomservice.template.dart' as _ref3;
import 'package:np8080/src/services/textprocessingservice.template.dart' as _ref4;
import 'package:np8080/src/services/themeservice.template.dart' as _ref5;
import 'rootinjector.template.dart' as _ref6;
import 'package:angular/src/di/injector/injector.dart' as _i1;
import 'package:angular/src/di/injector/hierarchical.dart' as _i2;
import 'package:np8080/src/services/eventbusservice.dart' as _i3;
import 'package:np8080/src/services/textprocessingservice.dart' as _i4;
import 'package:np8080/src/services/textareadomservice.dart' as _i5;
import 'package:np8080/src/services/themeservice.dart' as _i6;
import 'package:np8080/src/services/documentservice.dart' as _i7;

_i1.Injector rootInjector$Injector([_i1.Injector parent]) => new _Injector$rootInjector._(parent);

class _Injector$rootInjector extends _i2.HierarchicalInjector {
  _Injector$rootInjector._([_i1.Injector parent]) : super(parent);

  _i3.EventBusService _field0;

  _i4.TextProcessingService _field1;

  _i5.TextareaDomService _field2;

  _i6.ThemeService _field3;

  _i7.DocumentService _field4;

  _i3.EventBusService _getEventBusService$0() => _field0 ??= new _i3.EventBusService();
  _i4.TextProcessingService _getTextProcessingService$1() => _field1 ??= new _i4.TextProcessingService();
  _i5.TextareaDomService _getTextareaDomService$2() => _field2 ??= new _i5.TextareaDomService();
  _i6.ThemeService _getThemeService$3() => _field3 ??= new _i6.ThemeService();
  _i7.DocumentService _getDocumentService$4() => _field4 ??= new _i7.DocumentService();
  _i1.Injector _getInjector$5() => this;
  @override
  Object injectFromSelfOptional(Object token, [Object orElse = _i1.throwIfNotFound]) {
    if (identical(token, _i3.EventBusService)) {
      return _getEventBusService$0();
    }
    if (identical(token, _i4.TextProcessingService)) {
      return _getTextProcessingService$1();
    }
    if (identical(token, _i5.TextareaDomService)) {
      return _getTextareaDomService$2();
    }
    if (identical(token, _i6.ThemeService)) {
      return _getThemeService$3();
    }
    if (identical(token, _i7.DocumentService)) {
      return _getDocumentService$4();
    }
    if (identical(token, _i1.Injector)) {
      return _getInjector$5();
    }
    return orElse;
  }
}

var _visited = false;
void initReflector() {
  if (_visited) {
    return;
  }
  _visited = true;

  _ref0.initReflector();
  _ref1.initReflector();
  _ref2.initReflector();
  _ref3.initReflector();
  _ref4.initReflector();
  _ref5.initReflector();
  _ref6.initReflector();
}
