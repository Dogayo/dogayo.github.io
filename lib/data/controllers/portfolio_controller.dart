import 'package:dogayo_github_io/data/models/models.dart';
import 'package:dogayo_github_io/data/services/services.dart';
import 'package:flutter/foundation.dart';

class PortfolioController extends ValueNotifier<PortfolioControllerState> {
  PortfolioController({required this.service})
    : super(PortfolioControllerState$Initial());

  final PortfolioService service;

  Future<void> fetchPortfolioInfo() async {
    value = PortfolioControllerState$Loading();
    try {
      final info = await service.getPortfolioInfo();
      value = PortfolioControllerState$Loaded(info: info);
    } catch (e) {
      value = PortfolioControllerState$Error(message: e.toString());
    }
  }
}

sealed class PortfolioControllerState {}

class PortfolioControllerState$Initial implements PortfolioControllerState {}

class PortfolioControllerState$Loading implements PortfolioControllerState {}

class PortfolioControllerState$Loaded implements PortfolioControllerState {
  PortfolioControllerState$Loaded({required this.info});

  final PortfolioInfo info;
}

class PortfolioControllerState$Error implements PortfolioControllerState {
  PortfolioControllerState$Error({required this.message});

  final String message;
}
