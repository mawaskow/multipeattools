import {getLayerByName} from './customFunctions.js'

const map=$('#map').data('map');

/**
 * Elements that make up the offcanvas.
 */
const container = document.getElementById('offc-div');
const content = document.getElementById('offcanvas-body');

map.on('singleclick', function (evt) {
    const coordinate = evt.coordinate;
  
    // getting the layer source: getting the layer itself
    const bogLayer=getLayerByName('Bord_na_Mona');
    const bogSource=bogLayer.getSource();
  
    const view=map.getView();
    const resolution=view.getResolution();
    const projection=view.getProjection();
  
    const bogInfo=$('#offc-bog-info');
    bogInfo.html('');
    const IEInfo=$('#offc-IE-info');
    IEInfo.html('');
    const ipolInfo=$('#offc-ipol-info');
    ipolInfo.html('');
    const noFeatures=$('#offc-no-features');
    noFeatures.html('<p>No features</p>');
  
    const bogUrl=bogSource.getFeatureInfoUrl(coordinate, resolution, projection,
      {'INFO_FORMAT':'application/json'});
  
      if(bogUrl){
          $.ajax({
              url:bogUrl,
              method:'GET',
              success:function(result){
                  const bog=result.features[0];
                  if(bog){
                      const bogName=bog.properties.name;
                      //const bogGroup=bog.properties.boggroup;
                      const bogArea=bog.properties.area_km2;
  
                      bogInfo.html(`<h5>Bog Info</h5> 
                          <p>Name: ${bogName}</p>
                          <p>Area (sqkm): ${bogArea.toFixed(2)}</p>`);
                      noFeatures.html('');
                      }
  
              }
          })
      }
  
      const ipolLayer=getLayerByName('Irish_Policies');
      const ipolSource=ipolLayer.getSource();
      const ipolUrl=ipolSource.getFeatureInfoUrl(coordinate, resolution, projection,
          {'INFO_FORMAT':'application/json', 'FEATURE_COUNT':'1000'});    
      if(ipolUrl){
          $.ajax({
              url:ipolUrl,
              method:'GET',
              success:function(result){
                // how to add more than one return feature?
                  const ipol=result.features[0];
                  if(ipol){
                      const ipolPol=ipol.properties.p_name;
                      //const ipolCounty=ipol.properties.a_name;
  
                      ipolInfo.html(`<br><h5>Policy Info</h5> 
                          <p>Name: ${ipolPol}</p>`);
                      noFeatures.html('');
                  }
  
              }
          })
      }
  
      const IELayer=getLayerByName('Irish_Peatlands');
      const IESource=IELayer.getSource();
      const IEUrl=IESource.getFeatureInfoUrl(coordinate, resolution, projection,
          {'INFO_FORMAT':'application/json', 'FEATURE_COUNT':'1000'});    
      if(IEUrl){
          $.ajax({
              url:IEUrl,
              method:'GET',
              success:function(result){
                  const IE=result.features[0];
                  console.log(IE);
                  if(IE){
                      //const IEgc=IE.properties.gridcode;
                      const IEgc=IE.properties.site_type;
  
                      IEInfo.html(`<p>Type: ${IEgc}</p>`);
                      noFeatures.html('');
                }
  
            }
        })
    }
});